export const clip = ({ctx, margin, width, height}) => {
  let region = new Path2D();
  region.rect(0, 0, width, height - margin.bottom - margin.top);
  ctx.clip(region, "evenodd");
}
