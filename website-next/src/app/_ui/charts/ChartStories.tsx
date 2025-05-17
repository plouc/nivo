import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import {ChartStory} from "@/types/charts";
import styles from './ChartStories.module.css'

interface ChartStoriesProps {
    stories: ChartStory[]
    isFullWidth?: boolean
}

export const ChartStories = ({
    stories,
    isFullWidth = false,
}: ChartStoriesProps) => {
    return (
        <div className={isFullWidth ? styles.container__fullwidth : styles.container}>
            <div className={styles.header}>Recipes</div>
            {stories.map((story, i) => (
                <a
                    key={i}
                    href="/"
                    // href={buildStoryLink(story.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.story}
                >
                    <span className={styles.story_content}>
                        <span className={styles.story_label}>
                            {story.label}
                            {/*<MdKeyboardArrowRight size={20} color="#bbbbbb" />*/}
                        </span>
                        {story.description && (
                            <span className={styles.story_description}>
                                {story.description}
                            </span>
                        )}
                    </span>
                    <ArrowRightCircleIcon/>
                </a>
            ))}
        </div>
    )
}
