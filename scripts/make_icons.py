"""產生 PWA 圖示（小Co 的頭）。用 4x supersampling 取得平滑邊緣。"""
from PIL import Image, ImageDraw

FUR = (181, 138, 102, 255)
FUR_DARK = (145, 107, 76, 255)
FUR_LIGHT = (245, 236, 225, 255)
LINE = (138, 100, 70, 255)
INNER_EAR = (242, 180, 189, 255)
EYE = (59, 47, 40, 255)
NOSE = (196, 133, 127, 255)
BLUSH = (228, 154, 147, 120)
BG = (255, 232, 223, 255)


def ear(canvas, S, pivot, w, h, angle):
    """以 pivot 為旋轉中心畫一隻耳朵。PIL 的 rotate 是逆時針，所以右耳用負角度。"""
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    px, py = pivot
    lw = max(2, int(S * 0.006))
    d.ellipse([px - w / 2, py - h, px + w / 2, py], fill=FUR, outline=LINE, width=lw)
    iw, ih = w * 0.44, h * 0.66
    d.ellipse([px - iw / 2, py - h * 0.86, px + iw / 2, py - h * 0.86 + ih], fill=INNER_EAR)
    layer = layer.rotate(angle, resample=Image.BICUBIC, center=(px, py))
    return Image.alpha_composite(canvas, layer)


def draw_co(size, maskable=False):
    S = size * 4
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable:
        d.rectangle([0, 0, S, S], fill=BG)
        k = 0.62            # 安全區內縮，攤開的耳朵才不會被裁掉
        right_angle = -48
        head_cy = S * 0.56
    else:
        d.rounded_rectangle([0, 0, S, S], radius=S * 0.22, fill=BG)
        k = 0.78
        right_angle = -64
        head_cy = S * 0.58

    cx = S / 2
    hw, hh = S * 0.25 * k, S * 0.215 * k
    lw = max(2, int(S * 0.006))

    # 耳朵：左邊豎著、右邊往外攤，這是小Co 的招牌
    ear_w, ear_h = S * 0.125 * k, S * 0.33 * k
    ear_y = head_cy - hh * 0.45
    img = ear(img, S, (cx - hw * 0.44, ear_y), ear_w, ear_h, 8)
    img = ear(img, S, (cx + hw * 0.44, ear_y), ear_w, ear_h, right_angle)
    d = ImageDraw.Draw(img)

    # 頭
    d.ellipse([cx - hw, head_cy - hh, cx + hw, head_cy + hh], fill=FUR, outline=LINE, width=lw)

    # 頭頂較深的毛
    d.ellipse([cx - hw * 0.86, head_cy - hh * 1.02,
               cx + hw * 0.86, head_cy - hh * 0.10], fill=FUR_DARK)

    # 淺色眼圈
    er_x, er_y = hw * 0.33, hh * 0.31
    eye_y = head_cy - hh * 0.08
    for sx in (-1, 1):
        ex = cx + sx * hw * 0.40
        d.ellipse([ex - er_x, eye_y - er_y, ex + er_x, eye_y + er_y], fill=FUR_LIGHT)

    # 腮紅
    br = S * 0.040 * k
    for sx in (-1, 1):
        bx = cx + sx * hw * 0.70
        d.ellipse([bx - br, head_cy + hh * 0.26 - br * 0.66,
                   bx + br, head_cy + hh * 0.26 + br * 0.66], fill=BLUSH)

    # 眼睛 + 高光
    er = S * 0.032 * k
    for sx in (-1, 1):
        ex = cx + sx * hw * 0.40
        d.ellipse([ex - er, eye_y - er * 1.14, ex + er, eye_y + er * 1.14], fill=EYE)
        gr = er * 0.34
        d.ellipse([ex - gr + er * 0.32, eye_y - gr - er * 0.36,
                   ex + gr + er * 0.32, eye_y + gr - er * 0.36], fill=(255, 255, 255, 255))

    # 淺色鼻吻部
    mw, mh = hw * 0.42, hh * 0.34
    my = head_cy + hh * 0.42
    d.ellipse([cx - mw, my - mh, cx + mw, my + mh], fill=FUR_LIGHT)

    # 鼻子
    nw = S * 0.026 * k
    ny = my - mh * 0.10
    d.polygon([(cx, ny + nw * 0.72), (cx - nw, ny - nw * 0.42), (cx + nw, ny - nw * 0.42)],
              fill=NOSE)

    # 嘴
    lw2 = max(2, int(S * 0.009 * k))
    sw = S * 0.038 * k
    sy = ny + nw * 0.62
    d.arc([cx - sw, sy - sw * 0.40, cx, sy + sw * 0.74], 300, 360, fill=NOSE, width=lw2)
    d.arc([cx, sy - sw * 0.40, cx + sw, sy + sw * 0.74], 180, 240, fill=NOSE, width=lw2)

    return img.resize((size, size), Image.LANCZOS)


for name, size, mask in [
    ("icon-192.png", 192, False),
    ("icon-512.png", 512, False),
    ("icon-maskable-512.png", 512, True),
    ("apple-touch-icon.png", 180, False),
]:
    draw_co(size, mask).save(f"public/icons/{name}")
    print("寫出 public/icons/" + name)
