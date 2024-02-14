import bcrypt from 'bcryptjs'

export async function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(12)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export async function comparePassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash)
  return isMatch
}
