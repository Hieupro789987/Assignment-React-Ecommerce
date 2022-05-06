
export const convertDate = (date: number) => {
    const convertDate = new Date(date).toLocaleDateString('vi-VN');

    return convertDate;
}