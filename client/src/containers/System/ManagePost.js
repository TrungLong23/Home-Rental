import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components/";

const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false)
  const { PostOfCurrent } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, []);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  return (
    <div className="flex flex-col gap-6 ">
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
            <select className="outline-none border p-2 border-gray-200 rounded-md">
            <option value="">Lọc theo trạng thái</option>
            </select>
        </div>
        <table className="w-full table-auto">
            <thead>
            <tr className="flex w-full bg-blue-300 text-white">
                <th className="border flex-1 p-2">Mã tin</th>
                <th className="border flex-1 p-2">Ảnh đại diện</th>
                <th className="border flex-1 p-2">Tiêu đề</th>
                <th className="border flex-1 p-2">Giá</th>
                <th className="border flex-1 p-2">Ngày bắt đầu</th>
                <th className="border flex-1 p-2">Ngày hết hạn</th>
                <th className="border flex-1 p-2">trạng thái</th>
                <th className="border flex-1 p-2">Tùy chọn</th>
            </tr>
            </thead>
            <tbody>
            {!PostOfCurrent ? (
                <tr>
                <td>Hello</td>
                </tr>
            ) : (
                PostOfCurrent?.map((item) => {
                return (
                    <tr className="flex items-center h-16" key={item.id}>
                    <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                        {item?.overviews?.code}
                    </td>
                    <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                        <img
                        src={JSON.parse(item?.images?.image)[0] || ""}
                        alt="avata-post"
                        className="w-10 h-10 object-cover rounded-md"
                        />
                    </td>
                    <td className="border px-2 flex-1 h-full flex items-center justify-center ">{`${item?.title?.slice(
                        0,
                        40
                    )}...`}</td>
                    <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                        {item?.attributes?.price}
                    </td>
                    <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                        {item?.overviews?.created}
                    </td>
                    <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                        {item?.overviews?.expired}
                    </td>
                    <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                        {checkStatus(item?.overviews?.expired?.split(" ")[3])
                        ? "Đang hoạt động"
                        : "Hết Hạn"}
                    </td>
                    <td className="border px-2 flex-1 h-full text-center flex items-center justify-center gap-4">
                        <Button
                        text="Sửa"
                        bgColor="bg-green-600"
                        textColor="text-white"
                        onClick={() => {
                            dispatch(actions.editData(item))
                            setIsEdit(true)
                        }}
                        />
                        <Button
                        text="Xóa"
                        bgColor="bg-red-600"
                        textColor="text-white"
                        />
                    </td>
                    </tr>
                );
                })
            )}
            </tbody>
        </table>
        {isEdit && <UpdatePost setIsEdit={setIsEdit}/>}
    </div>
  );
};

export default ManagePost;
