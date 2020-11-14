/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    window.localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    window.localStorage.removeItem( 'user' );
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return window.localStorage.user && JSON.parse(window.localStorage.user);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback) {
    createRequest({
      method: 'GET',
      url: this.URL + '/current',
      data: data,
      responseType: 'JSON',
      callback: (err, data) => {
        if(data.user && data.success) {
          this.setCurrent(data.user);
        } 
        else {
          this.unsetCurrent();
        }
      callback(err, data);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/login',
      data: data,
      responseType: 'JSON',
      callback: (err, data) => {
        if(data.success) {
          this.setCurrent(data.user);
        }
        callback(err, data);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
   createRequest({
     method: 'POST',
     url: this.URL + '/register',
     data: data,
     responseType: 'JSON',
     callback: (err, data) => {
      if(data.success) {
        this.setCurrent(data.user);
      }
      callback(err, data);  
    }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/logout',
      data: data,
      responseType: 'JSON',
      callback: callback,
     });
  }
}
