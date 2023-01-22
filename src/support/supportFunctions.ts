export function hexToRgbA(hex: any, opacity: any) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      `,${opacity})`
    );
  }
  throw new Error("Bad Hex");
}

export function clean(obj: any) {
  const newObject = { ...obj };
  for (const propName in newObject) {
    if (newObject[propName] === undefined) delete newObject[propName];
    if (typeof newObject[propName] === "string") newObject[propName].trim();
  }
  return newObject;
}

export const timeZoneDateTime = (timestamp: number) => {
  const newDate = new Date(timestamp * 1000);
  const offset = newDate.getTimezoneOffset();
  const date = new Date(timestamp * 1000 - offset * 60000);

  let year = date.getUTCFullYear();
  let month: string | number = date.getUTCMonth() + 1;
  let day: string | number = date.getUTCDate();
  let hours: string | number = date.getUTCHours();
  let minutes: string | number = date.getUTCMinutes();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return day + "-" + month + "-" + year + " " + hours + ":" + minutes;
};

export const currencyFormatterDecimal = (
  val: number,
  currency: string = " Դ",
  sale: number = 0
) => {
  if (sale) {
    val = Math.floor(val - val * (sale / 100));
  }
  const roundVal = Math.floor(val * 100) / 100;
  return roundVal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(currency);
};
