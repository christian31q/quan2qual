import { useState } from "react";
export function TwitterFollowCard({children, userName, initialIsFollowing}){
const [isFollowing, setIsFollowing] = useState(initialIsFollowing)



const text = isFollowing ? 'Siguiendo' : 'Seguir' 
const buttonClassName = isFollowing ? 'md_twitter_follow-card-button is-following' : 'md_twitter_follow-card-button'

const handleClick = ()=>{
    setIsFollowing(!isFollowing) 
}

    return(
        <article className="md_twitter_follow-card">
            <header className="md_twitter_follow-card-header">
                <img className="md_twitter_follow-card-avatar" src={'https://unavatar.io/${userName}'} alt="Avatar" />
                <div className="md_twitter_follow-card-div">
                    <strong>{children}</strong>
                    <span className="md_twitter_follow-card-username">@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    {text}
                </button>
            </aside>
        </article>
    )
}