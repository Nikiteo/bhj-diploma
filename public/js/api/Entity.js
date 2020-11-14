/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    createRequest({
      method: 'GET',
      url: this.URL,
      data: data,
      responseType: 'JSON',
      callback: callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    createRequest({
      method: 'POST',
      url: this.URL,
      data: Object.assign({ _method: 'PUT' }, data ),
      responseType: 'JSON',
      callback: callback,
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    createRequest({
      method: 'GET',
      url: this.URL + '/' + id,
      data: data,
      responseType: 'JSON',
      callback: callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign(data, { _method: 'DELETE' }, { id });
    createRequest({
      method: 'POST',
      url: this.URL,
      data: modifiedData,
      responseType: 'JSON',
      callback: callback,
    });
  }
}

