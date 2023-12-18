//将2023-12-14T08:09:12.524Z转换为2023-12-14 16:09:12

export function formatTime(time: any) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

//判断一个值是否存在于一个数组中,并且返回对象

export function isExistInArray(array: any[], value: any) {
    if (value === undefined) return ''
    return array.map((item) => {
        if (item.value === value) {
            return item.label;
        }
    })
}
