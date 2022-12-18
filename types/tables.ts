export default interface TableContent {
  title: String;
  tags: String[];
  link: String;
  date: String;
}

export interface TableContents extends Array<TableContent> {}
