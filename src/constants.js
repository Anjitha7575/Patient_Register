import _get from 'lodash/get';

function getFullName(nameArr) {
    let a1 = _get(nameArr, '[0].given', []);
    let n1 = a1.join(' ');
    return n1 ? n1 : '-'
}

function getAge(birthDate) {
    if (birthDate && birthDate !== "_") {
        let d1 = new Date(birthDate);
        let d2 = new Date();
        let c1 = Math.abs(d1 - d2);
        let noOfDaysInYear = 60 * 60 * 24 * 1000 * 365;
        let c222 = Math.floor(c1 / noOfDaysInYear);
        return c222;
    }
    return "";
}

export const TabHeaders = [
    { title: "Name", itemKey: "name", key: "name" },
    { title: "Gender", itemKey: "gender", key: "gender" },
    { title: "Date Of Birth", itemKey: "birthDate", key: "birthDate" },
    { title: "Age", itemKey: "age", key: "age" },
    { title: "Phone No.", itemKey: "telecom[0].value", key: "phone" },
    { title: "Address", itemKey: "address[0].text", key: "address" }
]

export const transformData = (data) => {
    return data.map((item) => {
        let obj = {};
        TabHeaders.forEach((head) => {
            if (head.itemKey === "name") {
                obj[head.key] = getFullName(_get(item, `resource.${head.itemKey}`, ""));
            } else if (head.itemKey === "age") {
                obj["age"] = getAge(_get(item, `resource.birthDate`, ""))
            } else {
                obj[head.key] = _get(item, `resource.${head.itemKey}`, "");
            }
        })
        obj["id"] = item["resource"]["id"];
        return obj;
    })
}

export const sortDataOnKeys = (data, sortKey = {}) => {
    if (sortKey.key) {
        if (sortKey.key === "age") {
            if (sortKey.order) {
                return data.sort((a,b)=> a[sortKey.key]-b[sortKey.key]);
            }else{
                return data.sort((a,b)=> b[sortKey.key]-a[sortKey.key]);
            }
        } else {
            if (sortKey.order) {
                let r1 = data.sort((a, b) => {
                    if (a[sortKey.key] < b[sortKey.key]) {
                        return -1;
                    }
                    if (a[sortKey.key] > b[sortKey.key]) {
                        return 1;
                    }
                    return 0;
                });
                return r1;
            } else {
                let r1 = data.sort((a, b) => {
                    if (a[sortKey.key] < b[sortKey.key]) {
                        return 1;
                    }
                    if (a[sortKey.key] > b[sortKey.key]) {
                        return -1;
                    }
                    return 0;
                });
                return r1;
            }
        }
    } else {
        return data;
    }

}

export const colorsHex = [
    "#BFD8AF",
    "#F3D7CA",
    "#E5D4FF",
    "#AAD7D9",
    "#F9F7C9",
    "#AEDEFC",
    "#FFC7EA",
]

export const NavIcons = [
    { title: "", key: "user", iconCls: "fa-solid fa-hospital-user", classList: ["usrImg"] },
    { title: "Dashboard", key: "dashboard", iconCls: "fa-solid fa-table-list", classList: ["menus"] },
    { title: "Settings", key: "settings", iconCls: "fa-solid fa-gears", classList: ["menus"] },
    { title: "Logout", key: "logout", iconCls: "fa-solid fa-power-off", classList: ["menus logout"] },
]

export const filterBasedOnKey = (data, key, valNo) => {
    return data.filter((item) => {
        return item.age >= valNo;
    })
}