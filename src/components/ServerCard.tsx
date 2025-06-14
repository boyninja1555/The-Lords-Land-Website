// WARNING: This component is loaded on the browser because it is written in React (which has nothing to do with the server)
import "../styles/tablist.css"
import { useEffect, useState } from "react"
import type PingResponse from "../types/ping-response"
import type PlayerData from "../types/player-data"
import ParchmentTile from "../assets/background/parchment_tile.avif"

export default function ServerCard() {
	const [rePingStatus, setRePingStatus] = useState<number>(0)
	const [serverStatus, setServerStatus] = useState<PingResponse | null>(null)
	const [players, setPlayers] = useState<PlayerData[]>([])
	const [playerNamesModalOpened, setPlayerNamesModalOpened] = useState(false)

	// Sets the state of the player names modal on first load
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		if (urlParams.get("player-names-show") === "1") {
			setPlayerNamesModalOpened(true)
		}
	}, [])

	// Handles fetching the server status
	useEffect(() => {
		async function fetchServerStatus() {
			try {
				const response = await fetch(import.meta.env.PUBLIC_PING_URL)

				if (!response.ok) {
					throw new Error("Network response was not ok")
				}

				const data: PingResponse = await response.json()
				console.log(`[ProductionSafeDebugLog] Server status ping returned: ${JSON.stringify(data, null, 2)}`)
				setServerStatus(data)

				// Fallback for player list
				const originalPlayers =
					(data.players?.list ||
						[
							{
								name: import.meta.env.PUBLIC_DEFAULT_USERNAME,
								uuid: import.meta.env.PUBLIC_DEFAULT_UUID,
							},
						]) as PlayerData[]

				// Maps players to include cache
				const playersWithCache = originalPlayers.map((player: PlayerData) => {
					const cleanedUUID = player.uuid.replace(/-/g, "")
					return {
						...player,
						cache: {
							head: `https://crafatar.com/avatars/${cleanedUUID}?size=32&overlay=true`,
							skin: `https://crafatar.com/skins/${cleanedUUID}`,
						},
					}
				})
				setPlayers(playersWithCache)
			} catch (error) {
				console.error("Failed to fetch server status:", error)
			}
		}
		fetchServerStatus()
	}, [rePingStatus])

	// Toggles the player names modal
	function togglePlayerNamesModal() {
		setPlayerNamesModalOpened(!playerNamesModalOpened)
	}

	return (
		<>
			<div
				className="flex flex-col p-[1rem] w-max border-double border-[.2rem] border-foreground-2 rounded-[1rem] text-foreground-theme-1"
				style={{
					backgroundImage: `url("${ParchmentTile.src}")`,
				}}
			>
				<span className="text-[1.75rem]">Server Status</span>
				<span className="uppercase font-[Arial]">
					<span
						onClick={() => {
							setRePingStatus(Math.random())
						}}
						className="cursor-pointer"
					>
						Update <strong>(Click)</strong>
					</span>
				</span>

				<div className="flex flex-col mt-[1rem]">
					{serverStatus ? (
						<>
							<span className="font-[Arial]">
								<strong className="font-[Seagram]">Status:</strong>{" "}
								{serverStatus.online ? (
									<span className="text-green-700">Online</span>
								) : (
									<span className="text-red-700">Offline</span>
								)}
							</span>
							<span className="font-[Arial]">
								<strong className="font-[Seagram]">Player Count:</strong>{" "}
								{serverStatus.players ? (
									<>
										<span className="text-yellow-700">
											{serverStatus.players?.online}
										</span>{" "}
										out of{" "}
										<span className="text-yellow-700">
											{serverStatus.players?.max}
										</span>
									</>
								) : <span>0</span>}
							</span>
							<span>
								<span
									onClick={() => {
										togglePlayerNamesModal()
									}}
									className="cursor-pointer"
								>
									<strong>Player Names</strong>{" "}
									<span className="font-[Arial]">
										(Click to {playerNamesModalOpened ? "Close" : "Open"})
									</span>
								</span>
							</span>
						</>
					) : (
						<>
							<span className="font-[Arial]">
								<strong className="font-[Seagram]">Status:</strong> Loading...
							</span>
							<span className="font-[Arial]">
								<strong className="font-[Seagram]">Player Count:</strong> Loading...
							</span>
							<span>
								<span className="text-foreground-theme-2">
									Player Names{" "}
									<strong className="font-[Arial]">
										(Click to {playerNamesModalOpened ? "Close" : "Open"})
									</strong>
								</span>
							</span>
						</>
					)}
				</div>
			</div>

			{playerNamesModalOpened && (
				<div
					id="player-names-modal"
					className="flex flex-col p-[1rem] border-double border-[.2rem] border-foreground-2 rounded-[1rem] max-w-[40vw] w-full fixed top-[30vh] left-[50%] transform -translate-x-1/2"
					style={{
						backgroundImage: `url("${ParchmentTile.src}")`,
					}}
				>
					<h2>Player List with Names</h2>
					<div className="minecraft-tablist mt-[1rem]">
						{players.map((player: PlayerData, index: number) => (
							<div key={index} className="minecraft-tablist-item">
								<span className="player-head">
									<img
										src={player.cache?.head}
										alt={`${player.name}'s head`}
										className="player-head"
										width={32}
										height={32}
									/>
								</span>
								<span className="player-name">{player.name}</span>
							</div>
						))}
					</div>
					<span onClick={togglePlayerNamesModal} className="inline-block text-center cursor-pointer">
						Close
					</span>
				</div>
			)}
		</>
	)
}
