import React from "react";
import SkeletonElement from "./github-repo-search";

const SkeletonProfile = () => {
    return (
        <div className = "skeleton-wrapper">
            <div className="skeleton-profile">
                <table id="search_table">
                        <tr>
                            <td>
                                <SkeletonElement type="search_box"/>
                            </td>
                            <td>
                                <SkeletonElement type="search_btn"/>
                            </td>
                        </tr>
                </table>
                <SkeletonElement type="board"/>
            </div>
        </div>
    
    );

};

export default SkeletonProfile;