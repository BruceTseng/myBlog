const convertPagination = function (resource, currentPage) {
    // 分頁
    const totalResult = resource.length;
    const perpage = 3; // 每頁三筆資料
    const pageTotal = Math.ceil(totalResult / perpage); // 總頁數
    // let currentPage = 3; // 當前頁數
    if (currentPage > pageTotal) {
        currentPage = pageTotal;
    }

    const minItem = (currentPage * perpage) - perpage + 1;
    const maxItem = (currentPage * perpage);

    const data = [];
    resource.forEach(function (item, i) {
        let itemNum = i + 1;
        if (itemNum >= minItem && itemNum <= maxItem) {
            console.log(item.title, i);
            data.push(item);
        }
    });

    const page = {
        pageTotal,
        currentPage,
        hasPre: currentPage > 1,
        hasNext: currentPage < pageTotal,
    }

    console.log('總資料', totalResult, '每頁數量', perpage, '總頁數', pageTotal, '每頁第一筆', minItem, '每頁最後一筆', maxItem);
    // 分頁結束
    return {
        page,
        data
    }
};

module.exports = convertPagination;