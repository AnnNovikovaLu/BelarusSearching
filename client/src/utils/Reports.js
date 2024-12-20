import serverAPI from "../services/serverAPI";

const downloadBookingReportDOCX = async (id) => {
  try {
    const response = await serverAPI.getBookingReportDOCX(id);

    const fileName = `booking.docx`;

    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading the report:", error);
  }
};

// const downloadFavoriteMoviesReportDocx = async (
//   unathorizedCallback?: () => void
// ) => {
// try {
//   const response = await serverAPI.getFavoriteMoviesReportDocx(
//     unathorizedCallback
//   );

//   const fileName = `favorite_movies.docx`;

//   const blob = new Blob([response], {
//     type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   });
//   const link = document.createElement("a");
//   link.href = window.URL.createObjectURL(blob);
//   link.download = fileName;

//   link.click();
//   window.URL.revokeObjectURL(link.href);
// } catch (error) {
//   console.error("Error downloading the report:", error);
// }
// };

export { downloadBookingReportDOCX };
