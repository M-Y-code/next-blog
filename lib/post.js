import path from "path";
import fs from "fs";
//npm i gray-matterでmdファイルのメタデータを読み込むライブラリをインストールしておく
import matter from "gray-matter";
//npm i remark remark-html ->メタデータをhtmlに変換するライブラリ
import { remark } from "remark";
import html from "remark-html";

//path.join->ファイル名を取り出し
//(prosess.cwd(), "posts")->カレントディレクトリのpostsフォルダ指定
const postsDirectry = path.join(process.cwd(), "posts");


//mdファイルのデータを取り出す
export function getPostsData() {
    //fs.readdirSync->ファイルをオブジェクト(配列)として取得
    const fileNames = fs.readdirSync(postsDirectry);
    //配列を一つずつ取得
    const allPostsData = fileNames.map((fileName) => {
        //ファイル名から.mdを取り除く
        const id = fileName.replace(/\.md$/, "");

        //mdファイル名を文字列として読み取る

        //path.join->ファイル名を取り出し
        //(postsDirectry, fileName)->postsフォルダの各ファイル名指定
        const fullPath = path.join(postsDirectry, fileName);
        //fs.readFileSync->ファイルの読み込み
        //(fullPath, "utf8")->各ファイル名の中身を文字列として取得
        const fileContents = fs.readFileSync(fullPath, "utf8");

        //メタデータをオブジェクト(配列)として取り出す
        const matterResult = matter(fileContents);

        //idとメタデータ(スプレッド構文で配列を展開)を返す
        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export function getAllpostIds() {
    //fs.readdirSync->ファイルをオブジェクト(配列)として取得
    const fileNames = fs.readdirSync(postsDirectry);
    //配列を一つずつ取得
    return fileNames.map((fileName) => {
        //{params:{id: ~,}},{params:{id: ~,}}の形で返す
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        }
    })
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    //path.join->ファイル名を取り出し
    //(postsDirectry, `${id}.md`)->postsフォルダの各ファイル名指定
    const fullPath = path.join(postsDirectry, `${id}.md`);

    //fs.readFileSync->ファイルの読み込み
    //(fullPath, "utf8")->各ファイル名の中身を文字列として取得
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //メタデータをオブジェクト(配列)として取り出す
    const matterResult = matter(fileContents);
    //npm i remark remark-html
    //メタデータのコンテンツをhtmlに変換する
    const blogContent = await remark().use(html).process(matterResult.content);
    const blogContentHTML = blogContent.toString();

    //idに対応したブログコンテンツとメタデータを返す
    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}