import Link from "next/link";

const ControlPanelHeader = () => {
    return (
        <header className="control-panel-header">
            <ul className="control-list">
                <li className="p-4">
                    <Link
                        className="products-manager-link"
                        href="/dashboard/admin/admin-panel/products-manager"
                    >
                        Products Manager
                    </Link>
                </li>
                <li className="p-4">
                    <Link
                        className="orders-manager-link"
                        href="/dashboard/admin/admin-panel"
                    >
                        Orders Manager
                    </Link>
                </li>
                <li className="p-4">
                    <Link
                        className="categories-and-styles-manager-link"
                        href="/dashboard/admin/admin-panel/categories-and-styles-manager"
                    >
                        Categories And Styles Manager
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default ControlPanelHeader;