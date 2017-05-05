export default function(sprite) {
  if (sprite.y >= 640) sprite.y = -sprite.height
  else if (sprite.y <= -sprite.height) sprite.y = 640

  if (sprite.x >= 832) sprite.x = 192
  else if (sprite.x <= 192) sprite.x = 832
}