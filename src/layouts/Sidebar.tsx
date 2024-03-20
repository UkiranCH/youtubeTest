import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react"
import { Children, ElementType, ReactNode, useState } from "react"
import Button, { buttonStyles } from "../componentes/Button"
import { twMerge } from "tailwind-merge"
import { playlists, subscriptions } from "../data/sidebar"
import { useSiderbarContext } from "../contexts/SidebarContext"
import { PageHeaderFirstSection } from "./PageHeader"

export function Sidebar(){
    const {isLargeOpen, isSmallOpen, close} = useSiderbarContext()
    return <>
        <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${isLargeOpen ? "lg:hidden": "lg:flex"}`}>
            <SmallSidebarItem IconOrImgUrl={ Home} title="Home" url="/" />
            <SmallSidebarItem IconOrImgUrl={ Repeat} title="Shorts" url="/shorts" />
            <SmallSidebarItem IconOrImgUrl={ Clapperboard} title="Subscription" url="/subsctiption" />
            <SmallSidebarItem IconOrImgUrl={ Library} title="Library" url="/library" />
        </aside>
        {isSmallOpen && (
            <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"></div>
        )}
        {/* Desktop View */}
        <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex ${isLargeOpen ? "lg:flex":"lg:hidden"} ${isSmallOpen ? "flex bg-white z-[999] max-h-screen": "hidden"}`}>
            
            <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                <PageHeaderFirstSection />
            </div>
            
            <LargeSidebarSection>
                <LargeSidebarItem isActive IconOrImgUrl={ Home } title="Home" url="/" />
                <LargeSidebarItem  IconOrImgUrl={ Clapperboard} title="Subscription" url="/subsctiption"  />
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection visibleItemCount={5}>
            <LargeSidebarItem  IconOrImgUrl={ Library} title="Library" url="/ibrary"  />
            <LargeSidebarItem  IconOrImgUrl={ History} title="History" url="/history"  />
            <LargeSidebarItem  IconOrImgUrl={ PlaySquare} title="Your Videos" url="/your-videos"  />
            <LargeSidebarItem  IconOrImgUrl={ Clock } title="Watch Later" url="/playlist?list=WL"  />
            {playlists.map(playlists => (
                <LargeSidebarItem key={playlists.id}  IconOrImgUrl={ ListVideo } title={playlists.name} url={`/playlist?list=${playlists.id}`}  />
            ))}
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Subscriptions">
                {subscriptions.map(subscription => (
                    <LargeSidebarItem key={subscription.id}  IconOrImgUrl={subscription.imgUrl} title={subscription.channelName} url={`/@${subscription.id}`}  />
                ))}
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Explore">
            <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
            </LargeSidebarSection>
        </aside>
    </>
}

type SmallSidebarItemProps = {
    IconOrImgUrl : ElementType | string
    title: string
    url: string
}
function SmallSidebarItem( { IconOrImgUrl, title, url}: SmallSidebarItemProps){
    return (
        <a href={ url } className={ twMerge(buttonStyles({ variant:"gost"}), "py-4 px-1  flex flex-col items-center rounded-lg gap-1 " )} >
        <IconOrImgUrl className="w-6 h-6" />
        <div className="text-sm">{title}</div>
    </a>
    )
   
} 

type LargeSidebarSectionProps={
    children: ReactNode
    title? : string
    visibleItemCount?: number
}

function LargeSidebarSection( { children, title, visibleItemCount = Number.POSITIVE_INFINITY} :  LargeSidebarSectionProps){
    const [isExpanded, setIsExpanded]= useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpanButton = childrenArray.length > visibleItemCount
    const visiblaChildren = isExpanded ?  childrenArray :  childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
    return <div> 
        {title && <div className="ml-4 mt-2 text-lg mb-1"> {title} </div>}
        {visiblaChildren}
        {showExpanButton && (
            <Button onClick={() => setIsExpanded(e => !e)} variant="gost" className="w-full flex items-center rounded-lg gap-4 p-3">
                <ButtonIcon className="w-6 h-6"/>
                <div>{isExpanded ? "show Less" : " Show More" } </div>

            </Button>
        )}
        </div>
    
}
type LargeSidebarItemProps ={
    IconOrImgUrl : ElementType | string
    title: string
    url: string
    isActive? : boolean
}
function LargeSidebarItem( { IconOrImgUrl, title, url, isActive = false }: LargeSidebarItemProps) {
    return <a href={url} className={ twMerge(buttonStyles({ variant: "gost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary": undefined}` )}>
        {typeof IconOrImgUrl === "string"? (
            <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
        ) : (
            <IconOrImgUrl className="w-6 h-6" />
        )}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
        </div>

    </a>

}
