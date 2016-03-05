/* ========================================================================
 * Bootstrap: _custom-sidetray.js
 * ======================================================================== */
+function ($) {
  'use strict';

  // MODAL PLUGIN ADAPTER
  // ======================
  var originalModal = $.fn.modal
  var Modal = originalModal.Constructor

  var Sidetray = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$target             = $(this.options.target)
    this.isShown             = null
    this.ignoreBackdropClick = false
  }

  //
  // Additional Defaults
  //
  var EXTRA_DEFAULTS = {
    animate: true
  }

  Sidetray.VERSION = '0.3.0'

  // Durations below are used to sync modal-window and modal-background animations.
  Sidetray.TRANSITION_DURATION = Modal.TRANSITION_DURATION
  Sidetray.TRANSITION_OUT_DURATION = Modal.TRANSITION_OUT_DURATION
  Sidetray.BACKDROP_TRANSITION_DURATION = Modal.BACKDROP_TRANSITION_DURATION
  Sidetray.BACKDROP_TRANSITION_OUT_DURATION = Modal.BACKDROP_TRANSITION_OUT_DURATION

  Sidetray.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Sidetray.prototype.show = function (_relatedTarget) {
    var that = this
    var $target = $(this.options.target)

    if (!$target.hasClass('sidetray')) {
      $target.addClass('sidetray')
    }

    if (this.options.shake) {
      this.$target.modal({ shake: true })
    }

    var e = $.Event('show.bs.sidetray', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    this.isShown = true

    this.$target.on('click.dismiss.bs.sidetray', '[data-dismiss="modal"]', $.proxy(this.hide, this))
    this.$target.on('click.dismiss.bs.sidetray', $.proxy(function (e) {
      if (this.ignoreBackdropClick) {
        this.ignoreBackdropClick = false
        return
      }
      if (e.target !== e.currentTarget) return
      this.options.backdrop == 'static'
        ? this.$target[0].focus()
        : this.hide()
    }, this))

    this.backdrop(function () {
      // Sidetray 'shown' method fires
      that.$element.trigger($.Event('shown.bs.sidetray', { relatedTarget: _relatedTarget }))
    })
  }

  Sidetray.prototype.hide = function (e) {
    var that = this

    if (this.options.shake) {
      this.$target.modal('disableClose')
    } else {
      e = $.Event('hide.bs.sidetray')

      this.$target.off('click.dismiss.bs.sidetray')

      this.$element.trigger(e)

      this.isShown = false

      this.backdrop(function () {
        that.shake = null
        that.$element.trigger($.Event('hidden.bs.sidetray'))
      })
    }
  }

  Sidetray.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.options.animate ? 'animate-header' : ''

    if (this.isShown && animate) {
      var doAnimate = $.support.transition && animate

      this.$target.modal('show')

      setTimeout(function () {
        that.$target.addClass('in')
      }, 1)

      if (!callback) return

      doAnimate ?
        this.$element
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Sidetray.TRANSITION_DURATION) :
        callback()
    } else if (!this.isShown) {
      this.$target.modal('hide');

      var callbackRemove = function () {
        callback && callback()
      }

      $.support.transition && animate ?
        this.$element
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Sidetray.BACKDROP_TRANSITION_OUT_DURATION) :
        callbackRemove()
    } else if (callback) {
      callback()
    }
  }

  Sidetray.prototype.enableClose = function () {
    this.options.shake = false
    this.$element.modal({ shake: false })
    this.$element.modal('enableClose')

    this.$element.trigger($.Event('close-enabled.bs.sidetray'))
  }

  Sidetray.prototype.disableClose = function () {
    this.options.shake = true
    this.$element.modal({ shake: true })
    this.$element.modal('disableClose')

    this.$element.trigger($.Event('close-disabled.bs.sidetray'))
  }

  /**
   * Adapter for Modal Plugin
   *
   * Adds defaults and points to the local Modal pointer which is extended
   */
  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.sidetray')
      var options = $.extend({}, EXTRA_DEFAULTS, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.sidetray', (data = new Sidetray(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.sidetray             = Plugin
  $.fn.sidetray.Constructor = originalModal.Constructor

  // SIDETRAY DATA-API
  // ==============

  $(document).on('click.bs.sidetray.data-api', '[data-type="sidetray"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.sidetray') ? 'toggle' : $.extend({}, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    Plugin.call($target, option, this)
  })

}(jQuery)
