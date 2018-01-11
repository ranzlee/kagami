import * as moment from "moment";

export let NowAsUtc = (): Date => {
  return moment()
    .utc()
    .toDate();
};

export let NowAsLocal = (): Date => {
  return moment()
    .local()
    .toDate();
};

export let NowAsUtcString = (): string => {
  return moment()
    .utc()
    .format("L");
};

export let NowAsLocalString = (): string => {
  return moment()
    .local()
    .format("L");
};

export let StringDateAsUtcString = (date: string): string => {
  return moment(date)
    .utc()
    .format("L");
};

export let StringDateAsLocalString = (date: string): string => {
  return moment(date)
    .local()
    .format("L");
};

export let StringDateAsUtc = (date: string): Date => {
  return moment(date)
    .utc()
    .toDate();
};

export let StringDateAsLocal = (date: string): Date => {
  return moment(date)
    .local()
    .toDate();
};
