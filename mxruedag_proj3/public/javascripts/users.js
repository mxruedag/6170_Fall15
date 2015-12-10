(function() {

  /**
  * Method call when a user fills in the sign in form
  */
  $(document).on('submit', '#signin-form', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/login',
          helpers.getFormData(this)
      ).done(function(response) {
          currentUser = response.content.user;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  /**
  * Method call when a user fills in the sign in form
  */
  $(document).on('submit', '#register-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      if (formData.password !== formData.confirm) {
          $('.error').text('Password and confirmation do not match!');
          return;
      }
      delete formData['confirm'];
      $.post(
          '/users',
          formData
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  /**
  * Method call when a user clicks on the logout link in the tweets page
  */
  $(document).on('click', '#logout-link', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/logout'
      ).done(function(response) {
          currentUser = undefined;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#follow-creator-button', function(evt) {
      var item = $(this).parent();
      var followeeUsername = item.data('creator-username');
      $.post(
          '/users/follow',
          { followeeUsername: followeeUsername }
      ).done(function(response) {
          $('.notification').text('You are now following ' + followeeUsername);
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#follow-poster-button', function(evt) {
      var item = $(this).parent();
      var followeeUsername = item.data('poster-username');
      $.post(
          '/users/follow',
          { followeeUsername: followeeUsername }
      ).done(function(response) {
          $('.notification').text('You are now following ' + followeeUsername);
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();
