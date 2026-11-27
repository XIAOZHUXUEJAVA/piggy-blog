export function isActivePath(pathname: string, href: string) {
  if (href === '/archive' && pathname.startsWith('/blog/')) return true;
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
}
