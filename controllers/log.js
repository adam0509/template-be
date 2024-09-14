const db = require("../config/database");
const Log = db.log;
const { Op } = require("sequelize");


// OK
exports.findAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "logId",
      order = "ASC",
      search = "",
    } = req.query;

    // 确保 page 和 limit 是数字，且大于 0
    const parsedPage = parseInt(page, 10) || 1; // 默认值为 1
    const parsedLimit = parseInt(limit, 10) || 10; // 默认值为 10
    const offset = (parsedPage - 1) * parsedLimit;

    // 搜索条件
    const whereCondition = search
      ? {
        [Op.or]: [
          { peopleId: { [Op.like]: `%${search}%` } },
          { entity: { [Op.like]: `%${search}%` } }
        ],
      }
      : {};

    const { count, rows } = await Log.findAndCountAll({
      where: whereCondition,
      offset, // 计算过的 offset
      limit: parsedLimit, // 确保 limit 是数字
      order: [[sortBy, order]], // 动态排序
    })
    res.send({
      totalItems: count,
      logs: rows, // 变量
      totalPages: Math.ceil(count / parsedLimit), // 确保分页总数计算正确
      currentPage: parsedPage, // 确保当前页是数字
    })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Log."
    });
  }

};
