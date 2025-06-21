import { DateTime } from "luxon";
import { useEffect } from "react";
import { theme } from "../styles/theme"; 

export function useOutsideClicker(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export const stringSearch = (items, str, field, delay = 500) => { 
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          items.filter((item) =>
            !!field
              ? item[field].toLowerCase().includes(str.toLowerCase())
              : item.includes(str)
          )
        ),
      delay
    )
  );
};

export const getDate = (datestr) => {
  let date = new Date(datestr);

  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const langs = {
  bn: { nativeName: "বাংলা" },
  en: { nativeName: "English" },
};

export const Constants = {
  photo_gallery:"gallery",
	photo_project:"project",
	photo_sub_project:"sub_project",
	photo_customer:"customer",
	photo_investor:"investor",
}

export const formatGridDate = (str) => {
  return DateTime.fromFormat(str, "yyyy-MM-dd").toFormat("dd MMM yyyy")
}

export const formatGridDatetime = (str) => {
  return DateTime.fromFormat(str, "yyyy-MM-dd HH:mm").toFormat("hh:mm a, dd MMM, yyyy")
}

export const formatGridTimeStamp = (str) => {
  var date = '---';
  try {
    date = DateTime.fromFormat(str, "yyyy-MM-dd HH:mm:ss").toFormat("hh:mm:ss a, dd MMM, yyyy")
  } catch (error) {
    date = str;
  }
  return date;
}

export const getFinanCialYear = (size) => {
  var fnYear = [];
  var currentMonth = DateTime.now().month;
  for (let i = 1; i <= size; i++) {
    var nextYear = currentMonth > 5 ? DateTime.now().plus({ year: 1 }) : DateTime.now();
    var cYear = nextYear.minus({ year: i });
    fnYear.push(cYear.toFormat("yyyy") + "-" + cYear.plus({ year: 1 }).toFormat("yy"))
  }
  return (fnYear);
};

export const getBackYearList = (size) => {
  var ttYear = [];
  var currentMonth = DateTime.now().year;
  for (let i = 0; i <= size; i++) {
    ttYear.push(currentMonth - i)
  }
  return (ttYear);
};

export const getNextYearList = (size) => {
  var ttYear = [];
  var currentMonth = DateTime.now().year;
  for (let i = 0; i <= size; i++) {
    ttYear.push(currentMonth + i)
  }
  return (ttYear);
};

export const getBNFont = (font) => {
  var fontInt = parseInt(font?.split("px")[0]);
  var chFont = fontInt ? fontInt + 1 + "px" : theme.fontSize.smFont;
  return localStorage.i18nextLng == 'en' ? font : chFont;
};

export const checkNumber = (key) => {
  return  key>=0 && key <=9 || key=="Delete" || key == "Backspace" || key == "ArrowLeft" || key == "ArrowRight"  
 }

export const checkAnyNumber = (event) => {
  var val= event.target.value;
  var key = event.key;
return  key>=0 && key <=9 || key=="Delete" || key=="." && !val.includes(".") && val.length!=0 || key == "Backspace" || key == "ArrowLeft" || key == "ArrowRight"  
}
export const getSerialNO = (serial, length) => { 
  var ttNo = [];
  for (let i = serial; i <= length; i++) {
    ttNo.push(i)
  }
  return ttNo;
};

export const numberWithCommas=(x)=>{
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const getNumber=(x)=>{
   return x.replace(/[^0-9.]/g, '')
}

export default function ScrollToTop() { 
  window.scrollTo(0, 0); 
}
