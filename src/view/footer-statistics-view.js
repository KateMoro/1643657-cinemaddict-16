import AbstractView from './abstract-view.js';

const createFooterStatisticsTemplate = () => (`
  <p>130 291 movies inside</p>
`);

export default class FooterStatisticsView extends AbstractView {
  get template() {
    return createFooterStatisticsTemplate();
  }
}
