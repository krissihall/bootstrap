---
layout: docs
title: Fonts
group: components
---

## iconfont Font

### Available Icons
<div class="bs-iconfont">
  <ul class="bs-iconfont-list">
    {% for icon in site.data.iconfont %}
      <li>
        <span class="iconfont {{ icon }}"></span>
        <span class="iconfont-class">iconfont {{ icon }}</span>
      </li>
    {% endfor %}
  </ul>
</div>

### How to use

For performance reasons, all icons require a base class and individual icon class. To use, place the following code just about anywhere. Be sure to leave a space between the icon and text for proper padding.

{% callout danger %}
#### Don't mix with other components
Icon classes cannot be directly combined with other components. They should not be used along with other classes on the same element. Instead, add a nested `<span>` and apply the icon classes to the `<span>`.
{% endcallout %}

{% callout danger %}
#### Only for use on empty elements
Icon classes should only be used on elements that contain no text content and have no child elements.
{% endcallout %}

{% callout info %}
#### Changing the icon font location
By default, Bootstrap assumes that the icon font files will be located in the `../fonts/` directory relative to your deployed CSS. For example, if your CSS file is at `http://example.com/foobar/css/bootstrap.css`, then your font files should be at `http://example.com/foobar/fonts/iconfonts.woff`, etc.</p>
If you are placing the icon font files elsewhere or changing their filenames, you will need to adjust the `@icon-font-path` and/or `@iconfont-font-name` SCSS variables accordingly.
{% endcallout %}

{% callout info %}
#### `@import`ing Bootstrap via Scss may require adjusting the icon font location
If you `@import` Bootstrap's Scss source into your own Less file, you may need to adjust the `@icon-font-path` Less variable due to the way that the relative paths in our `url(...)`s work.
{% endcallout %}

{% example html %}
<span class="iconfont iconfont-bag"></span>
{% endexample %}

### Examples
Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.

{% example html %}
<div class="btn-toolbar" role="toolbar">
  <div class="btn-group">
    <button type="button" class="btn btn-default"><span class="iconfont iconfont-blog"></span></button>
    <button type="button" class="btn btn-default"><span class="iconfont iconfont-arrow1_l"></span></button>
    <button type="button" class="btn btn-default"><span class="iconfont iconfont-arrow1_r"></span></button>
    <button type="button" class="btn btn-default"><span class="iconfont iconfont-menu"></span></button>
  </div>
</div>
<div class="btn-toolbar" role="toolbar">
  <button type="button" class="btn btn-default btn-lg"><span class="iconfont iconfont-favorites"></span> Heart</button>
  <button type="button" class="btn btn-default"><span class="iconfont iconfont-favorites"></span> Heart</button>
  <button type="button" class="btn btn-default btn-sm"><span class="iconfont iconfont-favorites"></span> Heart</button>
  <button type="button" class="btn btn-default btn-xs"><span class="iconfont iconfont-favorites"></span> Heart</button>
</div>
{% endexample %}

### Adding icons
#### Back-up icons

Some of the more simple icons will have an alternate unicode character that you can set as a backup by modifying the code associated with it in iconmoon.

Resource: [Unicode character table](http://unicode-table.com/en/){:target="_blank"}
