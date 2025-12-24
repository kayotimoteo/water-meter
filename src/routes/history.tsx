import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, Droplets, Trash2 } from "lucide-react";
import { useState } from "react";
import { useWater } from "@/hooks/useWater";

export const Route = createFileRoute("/history")({
	component: HistoryPage,
});

function HistoryPage() {
	return (
		<div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-2 sm:p-4">
			<div className="mx-auto w-full max-w-md">
				<header className="mb-4 flex items-center justify-between sm:mb-6">
					<Link
						className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-white sm:gap-2"
						to="/"
					>
						<ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
						<span className="text-gray-400 text-sm sm:text-base">Voltar</span>
					</Link>
					<h1 className="font-bold text-lg text-white sm:text-xl">Histórico</h1>
					<div className="w-12 sm:w-16" />
				</header>
				<HistoryContent />
			</div>
		</div>
	);
}

function HistoryContent() {
	const { getAllRecords, deleteRecord, isLoaded } = useWater();
	const [copied, setCopied] = useState(false);

	if (!isLoaded) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="h-8 w-8 animate-spin rounded-full border-cyan-400 border-b-2" />
			</div>
		);
	}

	const records = getAllRecords();

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("pt-BR", {
			weekday: "long",
			day: "2-digit",
			month: "2-digit",
		});
	};

	const formatTime = (timestamp: number) => {
		return new Date(timestamp).toLocaleTimeString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const groupedByDate = records.reduce(
		(acc, record) => {
			if (!acc[record.date]) {
				acc[record.date] = {
					date: record.date,
					total: 0,
					records: [],
				};
			}
			acc[record.date].total += record.amount;
			acc[record.date].records.push(record);
			return acc;
		},
		{} as Record<
			string,
			{ date: string; total: number; records: typeof records }
		>
	);

	const sortedDates = Object.values(groupedByDate).sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	const exportToClipboard = async () => {
		const exportData = sortedDates.map((day) => ({
			date: day.date,
			formattedDate: formatDate(day.date),
			totalMl: day.total,
			items: day.records.map((r) => ({
				amount: r.amount,
				time: formatTime(r.timestamp),
			})),
		}));

		await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<button
				className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-700 py-2.5 font-medium text-sm text-white transition-colors hover:bg-slate-600 sm:mb-6 sm:py-3 sm:text-base"
				onClick={exportToClipboard}
				type="button"
			>
				{copied ? (
					<>
						<Check className="h-4 w-4 text-green-400 sm:h-5 sm:w-5" />
						<span className="text-green-400">Copiado!</span>
					</>
				) : (
					<>
						<Copy className="h-4 w-4 sm:h-5 sm:w-5" />
						<span>Copiar JSON</span>
					</>
				)}
			</button>

			{sortedDates.length === 0 ? (
				<div className="py-8 text-center sm:py-12">
					<Droplets className="mx-auto mb-4 h-12 w-12 text-gray-600 sm:h-16 sm:w-16" />
					<p className="text-gray-400 text-sm sm:text-base">
						Nenhum registro ainda
					</p>
					<Link
						className="mt-4 inline-block rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-sm text-white transition-colors hover:bg-cyan-600 sm:px-6 sm:text-base"
						to="/"
					>
						Adicionar água
					</Link>
				</div>
			) : (
				<div className="space-y-3 sm:space-y-4">
					{sortedDates.map((day) => (
						<div
							className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm"
							key={day.date}
						>
							<div className="flex items-center justify-between border-slate-700 border-b bg-slate-700/30 px-3 py-2.5 sm:px-4 sm:py-3">
								<div>
									<p className="font-semibold text-sm text-white capitalize sm:text-base">
										{formatDate(day.date)}
									</p>
									<p className="text-gray-500 text-xs sm:text-sm">
										{day.records.length} registro
										{day.records.length !== 1 ? "s" : ""}
									</p>
								</div>
								<div className="text-right">
									<p className="font-bold text-cyan-400 text-xl sm:text-2xl">
										{day.total}
									</p>
									<p className="text-gray-500 text-xs">ml total</p>
								</div>
							</div>
							<div className="space-y-2 p-2.5 sm:p-3">
								{day.records
									.sort((a, b) => b.timestamp - a.timestamp)
									.map((record) => (
										<div
											className="flex items-center justify-between rounded-lg bg-slate-700/30 p-2"
											key={record.id}
										>
											<div className="flex items-center gap-2 sm:gap-3">
												<Droplets className="h-3.5 w-3.5 flex-shrink-0 text-cyan-400 sm:h-4 sm:w-4" />
												<span className="text-sm text-white sm:text-base">
													{record.amount}ml
												</span>
												<span className="text-gray-500 text-xs sm:text-sm">
													{formatTime(record.timestamp)}
												</span>
											</div>
											<button
												className="flex-shrink-0 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-red-400/10 hover:text-red-400"
												onClick={() => deleteRecord(record.id)}
												type="button"
											>
												<Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
											</button>
										</div>
									))}
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}
