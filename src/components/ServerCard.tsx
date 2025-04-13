// WARNING: This component is loaded on the browser because it is written in React (which has nothing to do with the server)
import { useEffect, useState } from "react"
import type PingResponse from "../types/ping-response"
import type PlayerData from "../types/player-data"
import "../styles/tablist.css"

export default function ServerCard() {
	const [serverStatus, setServerStatus] = useState<PingResponse | null>(null)
	const [players, setPlayers] = useState<PlayerData[]>([])
	const [rePingStatus, setRePingStatus] = useState<number>(Math.random())
	const [playerNamesModalOpened, setPlayerNamesModalOpened] = useState(false)

	// Sets the state of the player names modal on first load
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		if (urlParams.get("player-names-show") === "1") {
			setPlayerNamesModalOpened(true)
		}
	}, [])

	// Sets a function to update the status every time it is requested
	useEffect(() => {
		// Create an async function so we can fetch
		async function fetchServerStatus() {
			try {
				// Fetch the status
				const response = await fetch(import.meta.env.PUBLIC_PING_URL)

				if (!response.ok) {
					throw new Error("Network response was not ok")
				}

				// Check the response data, and then set the status
				const data: PingResponse = await response.json()
				console.log(`PING RESPONSE: ${data}`)
				setServerStatus(data)

				// Provides a fallback for the player list
				const originalPlayers =
					(data.players?.list ||
						[
							{
								name: import.meta.env.PUBLIC_DEFAULT_USERNAME,
								uuid: import.meta.env.PUBLIC_DEFAULT_UUID,
							},
						]) as PlayerData[]

				// Re-makes the player list with cached content
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
				// Run the async function, which is allowed in sync functions if we do not get back a value besides void
				setPlayers(playersWithCache)
			} catch (error) {
				console.error("Failed to fetch server status:", error)
			}
		}
		fetchServerStatus()
	}, [rePingStatus])

	// Creates a function to toggle the visibility of the player names modal
	function togglePlayerNamesModal() {
		setPlayerNamesModalOpened(!playerNamesModalOpened)
	}

	return (
		<>
			<div className="flex flex-col p-[1rem] w-max bg-background-2 border-[.2rem] border-foreground-2 rounded-[1rem]">
				<span className="text-[1.75rem]">Server Status</span>
				<span className="uppercase">
					<a
						href="#"
						onClick={() => {
							setRePingStatus(Math.random())
						}}
					>
						Update <strong>(Click)</strong>
					</a>
				</span>

				<div className="flex flex-col mt-[1rem]">
					{serverStatus ? (
						<>
							<span>
								<strong>Status:</strong>{" "}
								{serverStatus.online ? (
									<span className="text-green-500">Online</span>
								) : (
									<span className="text-red-500">Offline</span>
								)}
							</span>
							<span>
								<strong>Player Count:</strong>{" "}
								<span className="text-yellow-300">
									{serverStatus.players?.online}
								</span>{" "}
								out of{" "}
								<span className="text-yellow-300">
									{serverStatus.players?.max}
								</span>
							</span>
							<span>
								<a
									href="#"
									onClick={() => {
										togglePlayerNamesModal()
									}}
								>
									Player Names{" "}
									<strong>
										(Click to {playerNamesModalOpened ? "Close" : "Open"})
									</strong>
								</a>
							</span>
							{/* Unused MOTD */}
							{/* <span className="flex flex-col mt-[1rem] p-[.5rem] bg-[rgba(0,0,0,.75)] text-[.75rem]" style={{ fontFamily: "Minecraft", }}>
								{serverStatus.motd?.html.map((line: string, index: number) => (
									<span key={index} dangerouslySetInnerHTML={{ __html: line, }}></span>
								))}
							</span> */}
						</>
					) : (
						<>
							<span>
								<strong>Status:</strong> Loading...
							</span>
							<span>
								<strong>Player Count:</strong> Loading...
							</span>
							<span>
								<span className="text-gray-300">
									Player Names{" "}
									<strong>
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
					className="flex flex-col p-[1rem] bg-background-2 border-[.2rem] border-foreground-2 rounded-[1rem] max-w-[40vw] w-full fixed top-[30vh] left-[50%] transform -translate-x-1/2"
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
					<a href="#" onClick={togglePlayerNamesModal}>Close</a>
				</div>
			)}
		</>
	)
}
