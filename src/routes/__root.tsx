import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Home } from "lucide-react";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Water Meter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	notFoundComponent: NotFoundComponent,

	shellComponent: RootDocument,
});

function NotFoundComponent() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-4">
			<div className="mx-auto w-full max-w-md text-center">
				<div className="mb-6">
					<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700/50">
						<span className="font-bold text-4xl text-gray-400">404</span>
					</div>
					<h1 className="mb-2 font-bold text-2xl text-white sm:text-3xl">
						Página não encontrada
					</h1>
					<p className="text-gray-400 text-sm sm:text-base">
						A página que você está procurando não existe ou foi movida.
					</p>
				</div>
				<Link
					className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
					to="/"
				>
					<Home className="h-5 w-5" />
					<span>Voltar para o início</span>
				</Link>
			</div>
		</div>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
			</head>
			<body suppressHydrationWarning>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
