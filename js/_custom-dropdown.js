/* ========================================================================
 * Bootstrap: _custom-dropdown.js v0.2.0
 * ========================================================================
 * Copyright 2014-2015 American Eagle Outfitters
 *
 *
 * ======================================================================== */
+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // ======================
  var dropdownSelection = '.dropdown-selection .dropdown-toggle'

  // DROPDOWN PLUGIN ADAPTER
  // ======================
  var originalDropdown = $.fn.dropdown;
  var Dropdown = originalDropdown.Constructor;

  //
  // Additional Methods
  //
  /**
   * Opens the options panel.
   */
  Dropdown.prototype.select = function () {
    var $this = $(this)
    var $parent = getParent($this)

    $parent.find('.dropdown-menu li').click(function () {
      Dropdown.prototype.chooseOption.call($(this))
    })
  }

  /**
   * Selects an option from the panel and close the panel.
   */
  Dropdown.prototype.chooseOption = function () {
    var $active = $(this)
    var $parent = $active.parent().parent()
    var $dropdownText = $parent.find('.dropdown-text')

    $active.siblings().removeClass('active')
    $active.addClass('active')
    $dropdownText.empty().text($active.text())
    $parent.addClass('has-selection')
  }

  function createDropdownLabel () {
    /*jshint validthis: true */
    var $this = $(this)
    var $parent  = getParent($this)
    var $dropdownToggle = $this.find('.dropdown-toggle')
    var labelText = $dropdownToggle.data('dropdown-label')

    $dropdownToggle.prepend('<div class="dropdown-label" />')
    $parent.find('.dropdown-label').text(labelText)
  }

  // Cloned from dropdown.js
  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  // Adapter for Dropdown Plugin
  // ======================
  /**
   * Adds additional functionality for selectable dropdown
   */
  function Plugin(option) {
    return this.each(function () {
      var $this      = $(this)
      var data       = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown               = Plugin;
  $.fn.dropdown.Constructor   = originalDropdown.Constructor;

  $(document)
    .ready(function () {
      $('[class*="dropdown-selection"]').each(function () {
        createDropdownLabel.call(this)
      })
    })
    .on('click.bs.dropdown.data-api', dropdownSelection, Dropdown.prototype.select)

}(jQuery);
