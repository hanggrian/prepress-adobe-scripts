---
layout: page
title: Download
permalink: /download
comments: false
---

<div class="row justify-content-between">
<div class="col-md-8 pr-5">

<a target="_blank" href="https://github.com/hendraanggrian/prepress-adobe-scripts/archive/refs/heads/main.zip" class="btn follow">Download Source Code</a>

<p>There are several ways to use the scripts, a recommended method is to install them in Adobe installation paths so that they may appear in <code class="highlighter-rouge">Menubar > File > Scripts</code>.</p>

<p>In any case, download the source code and pick one of the following solutions.</p>

<h5>Automatic Installation</h5>

<img src="https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/install.png"/>

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
  <img src="https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/menu_ai.png"/>
  <img src="https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/menu_psd.png"/>
</p>

<p>If you decide to install the scripts, they can be accessed from menubar or <a target="_blank" href="https://github.com/hendraanggrian/prepress-adobe-scripts/tree/main/Actions/">keyboard shortcuts</a>.</p>

</div>

<div class="col-md-4">

<div class="sticky-top sticky-top-80">
<h5>Got Issues?</h5>

<p>Help the scripts' development by reporting them.</p>

<a target="_blank" href="https://github.com/hendraanggrian/prepress-adobe-scripts/issues/" class="btn btn-warning">Report on GitHub</a>
<a target="_blank" href="mailto:hendraanggrian@gmail.com" class="btn btn-danger">Send me an email</a>

</div>
</div>
</div>
