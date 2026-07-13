import { computePosition, type AnchorRect } from "./useAnchorPosition";

function rect(left: number, top: number, width: number, height: number): AnchorRect {
  return { left, top, width, height, right: left + width, bottom: top + height };
}

const viewport = { width: 1024, height: 768 };
// Anchor comfortably in the middle of the viewport so no clamping kicks in.
const anchor = rect(400, 300, 200, 40); // right: 600, bottom: 340
const content = { width: 100, height: 50 };

describe("computePosition — side placement", () => {
  it("places on the bottom with offset", () => {
    const pos = computePosition(anchor, content, {
      side: "bottom",
      align: "start",
      offset: 8,
      viewport,
    });
    expect(pos).toEqual({ top: 348, left: 400 }); // anchor.bottom + 8
  });

  it("places on the top with offset", () => {
    const pos = computePosition(anchor, content, {
      side: "top",
      align: "start",
      offset: 8,
      viewport,
    });
    expect(pos).toEqual({ top: 242, left: 400 }); // anchor.top - height - 8
  });

  it("places on the right with offset", () => {
    const pos = computePosition(anchor, content, {
      side: "right",
      align: "start",
      offset: 8,
      viewport,
    });
    expect(pos).toEqual({ top: 300, left: 608 }); // anchor.right + 8
  });

  it("places on the left with offset", () => {
    const pos = computePosition(anchor, content, {
      side: "left",
      align: "start",
      offset: 8,
      viewport,
    });
    expect(pos).toEqual({ top: 300, left: 292 }); // anchor.left - width - 8
  });

  it("respects a custom offset", () => {
    const pos = computePosition(anchor, content, {
      side: "bottom",
      align: "start",
      offset: 20,
      viewport,
    });
    expect(pos.top).toBe(360);
  });
});

describe("computePosition — alignment", () => {
  it("aligns on the cross axis for vertical sides", () => {
    const opts = { side: "bottom" as const, offset: 8, viewport };
    expect(computePosition(anchor, content, { ...opts, align: "start" }).left).toBe(400);
    expect(computePosition(anchor, content, { ...opts, align: "center" }).left).toBe(450); // 400 + 100 - 50
    expect(computePosition(anchor, content, { ...opts, align: "end" }).left).toBe(500); // 600 - 100
  });

  it("aligns on the cross axis for horizontal sides", () => {
    const opts = { side: "right" as const, offset: 8, viewport };
    expect(computePosition(anchor, content, { ...opts, align: "start" }).top).toBe(300);
    expect(computePosition(anchor, content, { ...opts, align: "center" }).top).toBe(295); // 300 + 20 - 25
    expect(computePosition(anchor, content, { ...opts, align: "end" }).top).toBe(290); // 340 - 50
  });
});

describe("computePosition — viewport clamping", () => {
  it("clamps to the left margin when overflowing left", () => {
    const nearLeft = rect(0, 300, 50, 40);
    const wide = { width: 200, height: 50 };
    // center align would put left at 0 + 25 - 100 = -75
    const pos = computePosition(nearLeft, wide, {
      side: "bottom",
      align: "center",
      offset: 8,
      viewport,
    });
    expect(pos.left).toBe(8);
  });

  it("clamps to the right edge when overflowing right", () => {
    const nearRight = rect(1000, 300, 20, 40);
    const wide = { width: 200, height: 50 };
    const pos = computePosition(nearRight, wide, {
      side: "bottom",
      align: "start",
      offset: 8,
      viewport,
    });
    expect(pos.left).toBe(viewport.width - 200 - 8); // 816
  });

  it("keeps the popup on-screen when side: top has no room (flips down via clamping)", () => {
    const nearTop = rect(400, 4, 200, 40);
    const pos = computePosition(nearTop, content, {
      side: "top",
      align: "start",
      offset: 8,
      viewport,
    });
    // 4 - 50 - 8 = -54 → clamped to the 8px margin, staying visible.
    expect(pos.top).toBe(8);
  });

  it("clamps to the bottom edge when overflowing below", () => {
    const nearBottom = rect(400, 740, 200, 20);
    const pos = computePosition(nearBottom, content, {
      side: "bottom",
      align: "start",
      offset: 8,
      viewport,
    });
    expect(pos.top).toBe(viewport.height - content.height - 8); // 710
  });

  it("falls back to window dimensions when no viewport is given", () => {
    // jsdom default window is 1024x768; clamp math must match the explicit viewport.
    const nearRight = rect(1000, 300, 20, 40);
    const wide = { width: 200, height: 50 };
    const explicit = computePosition(nearRight, wide, {
      side: "bottom",
      align: "start",
      offset: 8,
      viewport: { width: window.innerWidth, height: window.innerHeight },
    });
    const implicit = computePosition(nearRight, wide, {
      side: "bottom",
      align: "start",
      offset: 8,
    });
    expect(implicit).toEqual(explicit);
  });
});

describe("computePosition — matchWidth", () => {
  it("uses the anchor width for placement and reports it", () => {
    const pos = computePosition(anchor, content, {
      side: "bottom",
      align: "start",
      offset: 8,
      matchWidth: true,
      viewport,
    });
    expect(pos).toEqual({ top: 348, left: 400, width: 200 });
  });

  it("center/end alignment math uses the matched width", () => {
    const opts = { side: "bottom" as const, offset: 8, matchWidth: true, viewport };
    // With width == anchor width, center and end both line up with the anchor.
    expect(computePosition(anchor, content, { ...opts, align: "center" }).left).toBe(400);
    expect(computePosition(anchor, content, { ...opts, align: "end" }).left).toBe(400);
  });

  it("clamps using the matched width", () => {
    const nearRight = rect(900, 300, 200, 40); // right edge at 1100 > viewport
    const pos = computePosition(nearRight, { width: 50, height: 50 }, {
      side: "bottom",
      align: "start",
      offset: 8,
      matchWidth: true,
      viewport,
    });
    expect(pos.left).toBe(viewport.width - 200 - 8); // clamped with width 200, not 50
    expect(pos.width).toBe(200);
  });

  it("uses anchor width when positioning on left/right sides", () => {
    const pos = computePosition(anchor, content, {
      side: "left",
      align: "start",
      offset: 8,
      matchWidth: true,
      viewport,
    });
    expect(pos.left).toBe(400 - 200 - 8); // anchor.left - anchor.width - offset
    expect(pos.width).toBe(200);
  });

  it("omits width when matchWidth is off", () => {
    const pos = computePosition(anchor, content, {
      side: "bottom",
      align: "start",
      offset: 8,
      viewport,
    });
    expect("width" in pos).toBe(false);
  });
});
