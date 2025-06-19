import clientSaveModel from "../../models/clientSaveModel.js";
import _ from "lodash";

const patchClientSaveById = async (id, updateData) => {
  // Lấy document hiện tại
  const current = await clientSaveModel.findById(id);
  if (!current) {
    throw new Error("Không tìm thấy ClientSave để cập nhật");
  }

  // Deep merge: giữ lại các trường cũ, chỉ cập nhật trường mới
  const merged = _.merge({}, current.toObject(), updateData);

  // Cập nhật lại document
  const updatedDoc = await clientSaveModel.findByIdAndUpdate(
    id,
    merged,
    { new: true }
  );

  return updatedDoc;
};

export default patchClientSaveById;