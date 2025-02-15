
import db from '../models';
import { Op } from "sequelize";
import { v4 as generateId } from 'uuid';
import generateCode from '../ultis/generateCode';
import moment from 'moment';
import generateDate from '../ultis/generateDate';

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts failed.',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getPostsLimitService = (page, query, { priceNumber, areaNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const queries = { ...query };
        if (priceNumber) queries.priceNumber = {[Op.between]: priceNumber };
        if (areaNumber) queries.areaNumber = {[Op.between]: areaNumber };
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts failed.',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'createdAt']
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts failed.',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const createNewPostService = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        const attributesId = generateId();
        const imagesId = generateId();
        const overviewId = generateId();
        const labelCode = generateCode(body.label);
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
        const currentDate = generateDate()
        await db.Post.create({
            id: generateId(), // Fix: Added parentheses to invoke generateId
            title: body.title,
            labelCode,
            address: body.address || null,
            attributesId,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description) || null,
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố ', '')) : generateCode(body?.province?.replace('Tỉnh ', '')) || null,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber
        });
        await db.Attribute.create({
            id: attributesId,
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2`,
            published: moment(new Date()).format('DD/MM/YYYY'),
            hashtag
        });
        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body.images)
        });
        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body.label,
            type: body?.category,
            target: body?.target,
            bonus: 'tin thường',
            created: currentDate.today,
            expired: currentDate.expireDay
        });
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace(' Thành phố ', '') },
                    { value: body?.province?.replace(' Tỉnh ', '') }
                ]
            },
            defaults: {
                code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố ', '')) : generateCode(body?.province?.replace('Tỉnh ', '')),
                value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố ', '') : body?.province?.replace('Tỉnh ', '')
            }
        });
        await db.Label.findOrCreate({
            where: {
                code: labelCode
            },
            default: {
                code: labelCode,
                value: body.label
            }
        });
        resolve({
            err: 0,
            msg: 'OK'
        });
    } catch (error) {
        reject(error);
    }
});

export const getPostsLimitAdminService = (page, id ,query) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const queries = { ...query, userId: id };
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                { model: db.Overview, as: 'overviews' },
            ],
            // attributes: ['id', 'title', 'star', 'address', 'description']
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts failed.',
            response
        });
    } catch (error) {
        reject(error);
    }
});
export const updatePost = ({ postId, attributeId, OverviewId, imagesId, ...body}) => new Promise(async (resolve, reject) => {
    try {
        const labelCode = generateCode(body.label);
        await db.Post.update({
            title: body.title,
            labelCode,
            address: body.address || null,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description) || null,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố ', '')) : generateCode(body?.province?.replace('Tỉnh ', '')) || null,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber
        }, {
            where: {
                id: postId
            }
        });
        await db.Attribute.update({
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2`,
        }, {
            where: {
                id: attributeId
            }
        });
        await db.Image.update({
            image: JSON.stringify(body.images)
        }, {
            where: { 
                id: imagesId
            }
        });
        await db.Overview.update({
            area: body.label,
            type: body?.category,
            target: body?.target
        }, {
            where: {
                id: OverviewId
            }
        });
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace(' Thành phố ', '') },
                    { value: body?.province?.replace(' Tỉnh ', '') }
                ]
            },
            defaults: {
                code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố ', '')) : generateCode(body?.province?.replace('Tỉnh ', '')),
                value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố ', '') : body?.province?.replace('Tỉnh ', '')
            }
        });
        await db.Label.findOrCreate({
            where: {
                code: labelCode
            },
            default: {
                code: labelCode,
                value: body.label
            }
        });
        resolve({
            err: 0 ,
            msg: 'Updating.'
        });
    } catch (error) {
        reject(error);
    }
});
export const deletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.destroy({    
            where: {id: postId}
        })
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Delete' : 'No post delete.',
        });

    } catch (error) {
        reject(error);
    }
});