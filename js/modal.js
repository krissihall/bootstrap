/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($, viewport) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$html               = $('html')
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false
    this.isSidetray          = false
    this.scrollTop           = null
    this.scrollToTop         = this.options.scrollToTop

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  // Durations below are used to sync modal-window and modal-background animations.
  Modal.TRANSITION_DURATION = 500
  Modal.TRANSITION_OUT_DURATION = Modal.TRANSITION_DURATION / 2
  Modal.BACKDROP_TRANSITION_DURATION = 0
  Modal.BACKDROP_TRANSITION_OUT_DURATION = Modal.TRANSITION_DURATION * 2
  Modal.SHAKE_TRANSITION_DURATION = 1000

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true,
    scrollToTop: false,
    shake: false
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    if (this.options.shake) {
      this.disableClose()
    }

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.scrollTop = this.$body.scrollTop()

    this.checkScrollbar()
    this.setScrollbar()
    this.$html.addClass('modal-open')

    var $modalOpenBody = $('.modal-open body')

    $(document).on('touchmove.bs.modal', function (evt) {
      evt.preventDefault()
    })

    $modalOpenBody.on('touchstart.bs.modal-body', '.modal-scroll', function (evt) {
      if (evt.currentTarget.scrollTop === 0) {
        evt.currentTarget.scrollTop = 1
      } else if (evt.currentTarget.scrollHeight ===
          evt.currentTarget.scrollTop +
          evt.currentTarget.offsetHeight) {
        evt.currentTarget.scrollTop -= 1
      }
    })

    $modalOpenBody.on('touchmove.bs.modal-body', '.modal-scroll', function (evt) {
      if ($(this)[0].scrollHeight > $(this).innerHeight()) {
        evt.stopPropagation()
      }
    })

    if (this.$element.hasClass('sidetray')) {
      this.$body.addClass('sidetray')
      this.isSidetray = true
    }

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal startdrag.bs.scrollbar', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('animate')
      var isSidetray = that.$element.hasClass('sidetray')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      // The 'adjustDialog' function is no longer needed.
      //   I want to keep the positioning intact in case Bootstrap makes changes in future versions
      // that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.addScrollWrappers()

      var $modalBody = that.$element.find('.modal-body')
      var modalBodyHeight = $modalBody.outerHeight()

      if (!isSidetray) {
        var heightThresholdCalculation = that.calculateHeightThreshold()

        that.$element.addClass('in')

        if (modalBodyHeight <= heightThresholdCalculation &&
            that.$element.find('.modal-body-pos').prop('scrollHeight') === modalBodyHeight &&
            viewport.is('>=md')) {
          that.$element.addClass('modal-valign')
        }
      }

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.addScrollWrappers = function () {
    if (!this.$element.find('.modal-scroll').length) {
      // Dynamically create containers to allow modal-body to be scrollable
      //   - Cross-browser compatibility requires multiple containers for proper positioning
      var $modalBodyContainer = $(document.createElement('div'))
          .addClass('modal-scroll')
      var $abs = $(document.createElement('div'))
          .addClass('modal-body-pos')

      $modalBodyContainer.append($abs)
      this.$element.find('.modal-body').wrapInner($modalBodyContainer)
    } else {
      return
    }
  }

  Modal.prototype.hide = function (e) {
    if (this.options.shake) {
      this.startShake()
    } else {
      if (e) e.preventDefault()

      e = $.Event('hide.bs.modal')

      this.$element.trigger(e)

      if (!this.isShown || e.isDefaultPrevented()) return

      this.isShown = false

      this.escape()
      this.resize()

      $(document).off('focusin.bs.modal')

      this.$element
        .removeClass('in')
        .off('click.dismiss.bs.modal')
        .off('mouseup.dismiss.bs.modal')

      this.$dialog.off('mousedown.dismiss.bs.modal')

      $.support.transition && this.$element.hasClass('animate') ?
        this.$element
          .one('bsTransitionEnd', $.proxy(this.hideModal, this))
          .emulateTransitionEnd(Modal.TRANSITION_OUT_DURATION) :
        this.hideModal()
    }
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    var delay = $(that.$element).find('.modal-dialog').css('transition-duration')
    delay = /ms$/.test(delay) ? parseFloat(delay, 10) : parseFloat(delay, 10) * 1000

    var extraDelayForSlowProcessors = 500
    var $modalBodyOpen = $('.modal-open body')

    setTimeout(function () {
      that.$element.hide();
    }, delay + extraDelayForSlowProcessors)

    // this.$element.hide()
    this.backdrop(function () {
      that.$html.removeClass('modal-open')
      $(document).off('touchmove.bs.modal')
      $modalBodyOpen.off('touchstart.bs.modal-body')
      $modalBodyOpen.off('touchmove.bs.modal-body')

      if (that.$element.hasClass('sidetray')) {
        that.$body.removeClass('sidetray')
      }
      // The resetAdjustments and resetScrollbar are no longer needed, but unit tests fail when they are removed
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')

      if (viewport.is('<=sm') || that.scrollToTop) {
        $(that.$body).scrollTop(that.scrollTop)
      }

      that.shake = null
      that.scrollTop = null
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('animate') ? 'animate-backdrop' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .insertAfter(this.$element)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      if (this.scrollToTop) {
        $(this.$body).scrollTop(0)
        this.scrollTop = 0
      }

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }

      $.support.transition && this.$element.hasClass('animate') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_OUT_DURATION) :
        callbackRemove()
    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.disableClose = function () {
    this.options.shake = true
    this.$element.trigger($.Event('close-disabled.bs.modal'))
  }

  Modal.prototype.enableClose = function () {
    this.options.shake = false
    this.$element.trigger($.Event('close-enabled.bs.modal'))
  }

  Modal.prototype.startShake = function (_relatedTarget) {
    var that = this
    var animate = $.support.transition && that.$element.hasClass('animate')
    var e = $.Event('shake-started.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    this.$element.addClass('animated shake')

    var callback = function () {
      that.removeShake()
      that.$element.trigger($.Event('shake-finished.bs.modal'))
    }

    animate ?
      this.$element
        .one('bsTransitionEnd', callback)
        .emulateTransitionEnd(Modal.SHAKE_TRANSITION_DURATION) :
      callback()
  }

  Modal.prototype.removeShake = function () {
    if (this.$element.hasClass('shake')) {
      this.$element.removeClass('animated shake')
    }
  }

  // these following methods are used to handle overflowing modals
  Modal.prototype.handleUpdate = function () {
    this.checkForScrollReset()

    if (this.$element.is(':visible')) {
      this.checkHeight()
    }
    // The 'adjustDialog' function is no longer needed.
    //   I want to keep the positioning intact in case Bootstrap makes changes in future versions
    // this.adjustDialog()
  }

  Modal.prototype.checkForScrollReset = function () {
    if (viewport.is('>sm') && !this.scrollToTop) {
      this.$body.scrollTop(this.scrollTop)
    }
  }

  Modal.prototype.checkHeight = function () {
    var modalEvent;
    var heightThresholdCalculation = this.calculateHeightThreshold()

    // If the height of the $(window) has changed, check to see if scroll
    // wrappers need to be added or removed
    if (this.$element.outerHeight() > heightThresholdCalculation) {
      this.$element.removeClass('modal-valign')
      modalEvent = 'scroll-enabled'
    }

    if (this.$element.find('.modal-body-pos').prop('scrollHeight')
        <= this.$element.find('.modal-body').outerHeight()
        && viewport.is('>=md')
        && !this.isSidetray) {

      this.$element.addClass('modal-valign')
      modalEvent = 'scroll-disabled'
    } else {
      this.$element.removeClass('modal-valign')
    }

    if (modalEvent) {
      var e = $.Event(modalEvent + '.bs.modal')
      this.$element.trigger(e)
    }
  }

  Modal.prototype.calculateHeightThreshold = function () {
    var $element = this.$element.find('.modal-content')
    var modalHeaderHeight = this.$element.find('.modal-header').outerHeight()
    var heightThresholdCalculation = $element.height() - modalHeaderHeight

    return heightThresholdCalculation;
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery, ResponsiveBootstrapToolkit);
