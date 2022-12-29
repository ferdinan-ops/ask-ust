const Report = require('../models/reportModel');

const createReport = async ({ userTarget, userSender, postId, message }) => {
   const link = `/forum/questions/${postId}`;

   try {
      const { data } = await Report.create({ userSender, userTarget, message, link });
      return data;
   } catch (error) {
      return error;
   }
}

module.exports = { createReport };