// ActionCreators
export function selectBook(book) {
  // ここでActionが渡すデータのことをpayloadという
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}
