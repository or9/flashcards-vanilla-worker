/*
 * flashcards
 * https://github.com/or9/flashcards
 *
 * Copyright (c) 2013 :Durmon
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.flashcards = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.flashcards = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.flashcards.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.flashcards.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].flashcards = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
