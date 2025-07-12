export default function handler(req, res) {
  const cookies = req.headers.cookie || '';
  const isAuthenticated = cookies.includes('auth=true');

  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  return res.status(200).json({ message: 'Authenticated' });
}