import { getSession } from './api/auth/[...nextauth]/auth';
import './global.css';
import Providers from './providers';

export const metadata = {
  title: 'Frontend App',
  description: 'At Monorepo Boilerplate',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <>{children}</>
        </Providers>
      </body>
    </html>
  );
}
