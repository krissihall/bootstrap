/* ========================================================================
 * Bootstrap: _custom-affix.js v0.1.4
 * ========================================================================
 * Copyright 2014-2015 American Eagle Outfitters
 *
 * Requires ResponsiveBootstrapToolkit
 * ======================================================================== */
+function ($, viewport) {
  'use strict';
  // AFFIX PLUGIN ADAPTER
  // ======================
  var originalAffix = $.fn.affix;
  var Affix = originalAffix.Constructor;
  //
  // Additional Defaults
  //
  var EXTRA_DEFAULTS = {
    // Define in between which breakpoints the plugin should run
    enabled: ['xs','sm','md','lg']
  };
  //
  // Additional Methods
  //
  /**
   * Turn on the listener to affix the element,
   * only if it should be enabled for the current viewport.
   */
  Affix.prototype.enable = function () {
    var arr;
    var i;
    var len;
    try {
      arr = $(this)[0].options.enabled;
    } catch (e) {
      return;
    }
    for (i = 0, len = arr.length; i < len; i++) {
      if (viewport.is(arr[i])) {
        this.$element && this.$element.removeClass('affix-disabled');
        return (this.$target = $(this.options.target)
          .on('scroll.bs.affix', $.proxy(this.checkPosition, this))
          .on('click.bs.affix',  $.proxy(this.checkPositionWithEventLoop, this)))
      }
    }
  }
  /**
   * Turn off the listener to affix the element.
   */
  Affix.prototype.disable = function () {
    this.$target
      .off('scroll.bs.affix', $.proxy(this.checkPosition, this))
      .off('click.bs.affix',  $.proxy(this.checkPositionWithEventLoop, this))
    this.$element.removeClass($.fn.affix.Constructor.RESET).addClass('affix-disabled')
    this.$element.css('width', '')
  }
  /**
   * @method determineEnabledState
   * @private
   * @description Decide whether the plugin should be active or not based on the `enabled` option array.
   */
  function determineEnabledState() {
    /*jshint validthis: true */
    var plugin = $(this).data('bs.affix');
    if (!plugin) { /* The affix plugin hasn't been instantiated, ignore it. */ return; }
    var arr = plugin && plugin.options && plugin.options.enabled || [];
    for (var i = 0, len = arr.length; i < len; i++) {
      if (viewport.is(arr[i])) {
        return $(this).data('bs.affix').enable()
      }
    }
    return $(this).data('bs.affix').disable()
  }
  /**
   * Adapter for Affix Plugin
   *
   * Adds defaults and points to the local Affix pointer which is extended
   */
  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option
      // New Defaults
      options = $.extend({}, EXTRA_DEFAULTS, options);
      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      determineEnabledState.call(this);
      if (typeof option == 'string') data[option]()
    })
  }
  $.fn.affix             = Plugin;
  $.fn.affix.Constructor = originalAffix.Constructor;
  $(window).on('resize, load', function () {
    $('[class*="affix"]').each(function () {
      determineEnabledState.call(this);
    })
  })
}(jQuery, ResponsiveBootstrapToolkit);
