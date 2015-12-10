(function() {
  /**
  * Call method when user presses the Submit button in the tweets page (to submit a new tweet)
  */
  $(document).on('click', '#submit-new-tweet', function(evt) {
      var content = $('#new-tweet-input').val();
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/tweets',
          { content: content }
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  /**
  * Call method when the users presses the Retweet link right next to a specific tweet
  */
  $(document).on('click', '.retweet', function(evt) {
      var item = $(this).parent();
      var id = item.data('tweet-id');
      $.post(
          '/tweets/retweet',
          { tweetId :id         
      }).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  /**
  * Call method when user presses the Delete link right next to a specific tweet
  */
  $(document).on('click', '.delete-tweet', function(evt) {
      var item = $(this).parent();
      var id = item.data('tweet-id');
      $.ajax({
          url: '/tweets/' + id,
          type: 'DELETE'
      }).done(function(response) {
          item.remove();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#feed-button', function(evt) {
      $.get(
          '/tweets/feed'
      ).done(function(response) {
          loadFeedPage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#all-button', function(evt) {
      $.get(
          '/tweets'
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();
