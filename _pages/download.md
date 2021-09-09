---
layout: page
title: Download
permalink: /download
comments: false
---

<!--div class="row justify-content-between">
<div class="col-md-8 pr-5"-->

<p>There are several ways to use the scripts, a recommended method is to install them in Adobe installation paths so that they may appear in <code class="highlighter-rouge">Menubar > File > Scripts</code>.</p>

<p>In any case, download the source code and pick one of the following solutions.</p>

<a target="_blank" href="https://github.com/hendraanggrian/prepress-adobe-scripts/archive/refs/heads/main.zip" class="btn follow">Download Source Code</a>

<h5>Automatic Installation</h5>

<img src="https://raw.githubusercontent.com/hendraanggrian/prepress-adobe-scripts/main/docs/images/install.png"/>

<p>Run <code class="highlighter-rouge">install.bat</code> as admin (Windows) or <code class="highlighter-rouge">install.sh</code> with sudo (macOS).</p>

<h5>Manual Installation</h5>

<p>Find <b>Scripts</b> directory in your local Adobe installation paths:</p>
<ul>
    <li>Illustrator - <code class="highlighter-rouge">$PATH_TO_APP/Presets/$LOCALE_CODE/Scripts</code>.</li>
    <li>Photoshop - <code class="highlighter-rouge">$PATH_TO_APP/Presets/Scripts</code>.</li>
</ul>

<p>Now copy these:</p>
<ul>
    <li>Content of <code class="highlighter-rouge">Illustrator/Photoshop Scripts</code> to <b>Scripts</b>.</li>
    <li><code class="highlighter-rouge">.stdlib</code> and <code class="highlighter-rouge">.stdres</code> to parent directory of <b>Scripts</b>.</li>
</ul>

<h5>No Installation</h5>

<p>It is possible to use the scripts by drag-and-dropping JSX files directly to Adobe apps. Just make sure to keep the entirety of root folder instead of <code class="highlighter-rouge">Illustrator/Photoshop Scripts</code> folders.</p>

<p>This is because the scripts are <b>not standalone</b>, all of them require hidden directories to be in pre-determined locations.</p>

<h3>Usage</h3>

<p>
<img src="https://raw.githubusercontent.com/hendraanggrian/prepress-adobe-scripts/main/docs/images/menu_ai.png"/>
<img src="https://raw.githubusercontent.com/hendraanggrian/prepress-adobe-scripts/main/docs/images/menu_psd.png"/>
</p>

<p>If you decide to install the scripts, they can be accessed from menubar or keyboard shortcuts.</p>

<h5>Keyboard Shorcuts</h5>

<p>This is made possible by using Actions feature which binds Fn keys to menu item.
However, they need to be setup manually:</p>
<ol>
    <li>In Actions panel, select <code class="highlighter-rouge">Load Actions...</code>.</li>
    <li>Navigate to local Adobe installation path, and find <code class="highlighter-rouge">Actions</code> directory under <code class="highlighter-rouge">Presets</code>.</li>
    <li>Open a file named <code class="highlighter-rouge">Prepress Adobe Script</code>.</li>
</ol>

<!--/div>

<div class="col-md-4">

<div class="sticky-top sticky-top-80">
<h5>Buy me a coffee</h5>

<p>Thank you for your support! Your donation helps me to maintain and improve <a target="_blank" href="https://github.com/wowthemesnet/mediumish-theme-jekyll">Mediumish <i class="fab fa-github"></i></a>.</p>

<a target="_blank" href="https://www.wowthemes.net/donate/" class="btn btn-danger">Buy me a coffee</a> <a target="_blank" href="https://bootstrapstarter.com/bootstrap-templates/template-mediumish-bootstrap-jekyll/" class="btn btn-warning">Documentation</a>

</div>
</div>
</div-->
