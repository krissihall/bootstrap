/* ========================================================================
 * Bootstrap: selectable-dropdown.js v0.0.1
 * ========================================================================
 *
 *
 * ======================================================================== */
+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // ======================
  var dropdownSelection = '[class*="dropdown-selection"]'

  var SelectableDropdown = function (element, options) {
    this.$element      = $(element).find('.dropdown-toggle')
    this.$dropdown     = $(element)
    this.$selected     = null
    this.value         = options.value
    this.dropdownLabel = options.dropdownLabel
    this.hasHtml       = options.hashtml

    this.init()
  }

  if (!$.fn.dropdown) throw new Error('Selectable Dropdown requires dropdown.js')

  SelectableDropdown.VERSION = '2.0.0'

  var DEFAULTS = {
    value: '',
    dropdownLabel: '',
    selected: null,
    hashtml: false
  }

  // NOTE: SELECTABLE DROPDOWN EXTENDS dropdown.js
  // ================================
  SelectableDropdown.prototype = $.extend({}, $.fn.dropdown.Constructor.prototype);

  SelectableDropdown.prototype.constructor = SelectableDropdown

  SelectableDropdown.prototype.init = function () {
    var $dropdownMenu = this.$dropdown.find('.dropdown-menu')
    var e             = $.Event('created.bs.selectableDropdown')

    this.createDropdownLabel()

    this.$element
      .on('click.bs.selectableDropdown.data-api', $.proxy(this.select, this))

    $dropdownMenu.find('li')
      .on('click.bs.selectableDropdown', $.proxy(this.chooseOption, this))

    this.$element.trigger(e)
  }

  //
  // Additional Methods
  //
  /**
   * Opens the options panel.
   */
  SelectableDropdown.prototype.select = function (_relatedTarget) {
    var dropdown = this.$dropdown
    var type

    if (dropdown.hasClass('open')) {
      type = 'close'
    } else {
      type = 'open'
    }

    dropdown.trigger($.Event(type + '.bs.selectableDropdown', { relatedTarget: _relatedTarget }))
  }

  /**
   * Selects an option from the panel and close the panel.
   */
  SelectableDropdown.prototype.chooseOption = function (evt) {
    var $active         = $(evt.target).closest('li')
    var $dropdownText   = this.$element.find('.dropdown-text')
    var e               = $.Event('change.bs.selectableDropdown')
    var selectedValue   = this.$element.data('value') || ''
    var hasOptionValue  = $active.data().hasOwnProperty('value')

    if (!$active.hasClass('active')) {
      if (hasOptionValue
            && selectedValue.toString() !== $active.data('value').toString()) {
        this.value = $active.data('value').toString().trim()
      } else {
        if (this.hasHtml) {
          this.value = $active.html()
        } else {
          this.value = $active.text().trim()
        }
      }

      $active.siblings().removeClass('active')
      $active.addClass('active')

      if (this.hasHtml) {
        $dropdownText.empty().html($active.html())
        this.$element.find('.dropdown-label').empty().html(this.dropdownLabel)
      } else {
        $dropdownText.empty().text($active.text())
        this.$element.find('.dropdown-label').empty().text(this.dropdownLabel)
      }
      this.$dropdown.addClass('has-selection')

      this.$element.data('value', this.value)
      this.$element.attr('data-value', this.value)

      this.$selected = $active
      this.$element.trigger(e)
    }

    if (this.$dropdown.hasClass('open')) {
      this.$dropdown.trigger($.Event('close.bs.selectableDropdown'))
    }
  }

  /**
   * Method used to clear selection option
   */
  SelectableDropdown.prototype.clear = function (_relatedTarget) {
    var e = $.Event('clear.bs.selectableDropdown', { relatedTarget: _relatedTarget })

    if (this.$dropdown.hasClass('has-selection')
        || this.value !== null) {
      this.$dropdown.removeClass('has-selection')
      this.$element.siblings('.dropdown-menu').find('li').removeClass('active')

      this.$element.removeData('value')
      this.$element.removeAttr('data-value')
      this.$element.find('.dropdown-text').empty().text(this.dropdownLabel)

      this.value     = null
      this.$selected = null
      this.$dropdown.trigger(e)
    }
  }

  /**
   * Creates the label
   */
  SelectableDropdown.prototype.createDropdownLabel = function () {
    var labelText    = this.dropdownLabel
    var trimmedValue = $.trim(this.value) || ''

    if (this.$element.find('.dropdown-text').length <= 0) {
      this.$element.prepend('<div class="dropdown-text" />')
    }

    if (this.$element.find('.dropdown-label').length <= 0) {
      this.$element.prepend('<div class="dropdown-label" />')
    }

    if (trimmedValue !== '') {
      this.value = trimmedValue
      this.$selected  = this.$dropdown.find('.dropdown-menu .active')

      this.$element.find('.dropdown-label').empty().text(labelText)
      this.$element.find('.dropdown-text').empty().text(this.$selected.text())
    } else {
      this.$element.find('.dropdown-text').empty().text(labelText)
    }
  }

  // Adapter for Dropdown Plugin
  // ======================
  /**
   * Adds additional functionality for selectable dropdown
   */
  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this      = $(this)
      var data       = $this.data('bs.selectableDropdown')
      var options    = $.extend({}, DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.selectableDropdown', (data = new SelectableDropdown(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
    })
  }

  var old = $.fn.selectableDropdown

  $.fn.selectableDropdown               = Plugin;
  $.fn.selectableDropdown.Constructor   = SelectableDropdown;

  // SELECTABLE DROPDOWN NO CONFLICT
  // =================

  $.fn.selectableDropdown.noConflict = function () {
    $.fn.selectableDropdown = old
    return this
  }

  $(window).on('load', function () {
    $(dropdownSelection).each(function () {
        var $this    = $(this)
        var $element = $this.find('.dropdown-toggle')
        var data     = $element.data('bs.selectableDropdown') ? 'select' : $element.data()

        Plugin.call($this, data, this)
      })
  })

  $(document).on('click.bs.selectableDropdown.data-api', '.dropdown-selection .dropdown-toggle', function () {
    var $this    = $(this)
    var $parent  = $this.parent('.dropdown-selection')
    var data     = $parent.data('bs.selectableDropdown') ? 'select' : $this.data()

    Plugin.call($parent, data, this)
  })

}(jQuery);
