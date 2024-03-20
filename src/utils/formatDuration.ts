const LeadingZeroFormater = new Intl.NumberFormat
(undefined, {minimumIntegerDigits:2, })
export function formatDuration(duration:number){
    const hours = Math.floor(duration / 60 / 60);
    const minutes = Math.floor((duration - hours * 60 * 60)/ 60 )
    const seconds = duration % 60

    if (hours > 0){
        return `${hours}:${LeadingZeroFormater.format(minutes)}:${LeadingZeroFormater.format(seconds)}`
    }

    return `${minutes}:${LeadingZeroFormater.format(seconds)}`

}