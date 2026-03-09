#!/usr/bin/env python3
"""Build script: inline CSS, JS, images -> single HTML file"""
import re, base64, os, sys

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SRC, 'wedding-v6-demo.html')

def b64(p, mt='image/jpeg'):
    return f"data:{mt};base64,{base64.b64encode(open(p,'rb').read()).decode()}"

html = open(f'{SRC}/index.html','r',encoding='utf-8').read()
css  = open(f'{SRC}/css/main.css','r',encoding='utf-8').read()
js   = open(f'{SRC}/js/main.js','r',encoding='utf-8').read()

# Hero images
for side, fname in [('groom','hero-groom.jpg'),('bride','hero-bride.jpg')]:
    p = f'{SRC}/images/hero/{fname}'
    if os.path.exists(p):
        uri = b64(p)
        js = js.replace(f"url('images/hero/hero-{side}.jpg')", f"url('{uri}')")

# Hero default CSS
hero_default = f'{SRC}/images/hero/hero-groom.jpg'
if os.path.exists(hero_default):
    uri = b64(hero_default)
    css = re.sub(r"url\('../images/hero/hero\.jpg'\)", f"url('{uri}')", css)
    if 'background-image' not in css.split('.hero-bg.has-photo')[1][:300]:
        css = re.sub(r'(\.hero-bg\.has-photo\s*\{)', f"\\1\n  background-image: url('{uri}');", css)

# Gallery
for i in range(1,7):
    p = f'{SRC}/images/gallery/photo-{i:02d}.jpg'
    if os.path.exists(p): js = js.replace(f"'images/gallery/photo-{i:02d}.jpg'", f"'{b64(p)}'")

# QR codes
for img_id, fn in [('qr-groom-img','qr-groom.jpg'),('qr-bride-img','qr-bride.jpg')]:
    p = f'{SRC}/images/{fn}'
    if os.path.exists(p):
        html = re.sub(rf'(<img\s+id="{img_id}")', rf'\1 src="{b64(p)}"', html)

html = re.sub(r'<link rel="stylesheet" href="css/main\.css"[^>]*>', f'<style>{css}</style>', html)
html = re.sub(r'<script src="js/main\.js"[^>]*></script>', f'<script>{js}</script>', html)

open(OUT,'w',encoding='utf-8').write(html)
print(f'✅ Built: {OUT} ({os.path.getsize(OUT)//1024} KB)')
