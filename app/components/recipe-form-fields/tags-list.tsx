import {StyleSheet, View} from "react-native";
import {Chip} from "@/components/chip";
import {RecipeTag} from "@/types/recipe";


export const TagsList = (props: { tags: RecipeTag[]; setTags: any; }) => {
    const {tags, setTags} = props;

    return (
        <View style={styles.tagsContainer}>
            {tags.map((tag: RecipeTag, ) =>
                <Chip key={tag.tag_id} label={tag.tag_text}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
})