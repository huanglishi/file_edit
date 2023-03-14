export const getCurrentKey = () => {
  return localStorage.getItem("demo-key") || "default";
};

export const setCurrentKey = (key = "default") => {
  localStorage.setItem("demo-key", key);
};
//1.1保存文档模板
export const setDocValue = (value: string, key: string = getCurrentKey()) => {
  localStorage.setItem(`${key}-demo-value`, value);
};
//1.2获取文档模板
export const getDocValue = (key: string = getCurrentKey()) => {
  return localStorage.getItem(`${key}-demo-value`);
};
//2.1保存文档组件设置
export const setPluginValue = (value: string, key: string = getCurrentKey()) => {
  localStorage.setItem(`${key}-plugin-value`, value);
};
//2.2获取文档组件设置
export const getPluginValue = (key: string = getCurrentKey()) => {
  return localStorage.getItem(`${key}-plugin-value`);
};
//2.2获取文档组件设置
export const getTabeValue = () => {
  const strhtml=`<div data-card-value="data:%7B%22rows%22%3A5%2C%22cols%22%3A5%2C%22overflow%22%3Afalse%2C%22id%22%3A%22ZtEgE%22%2C%22type%22%3A%22block%22%2C%22height%22%3A192%2C%22width%22%3A699%2C%22html%22%3A%22%3Ctable%20class%3D%5C%22data-table%5C%22%20data-id%3D%5C%22t3a1y6rew-i7pa8t7qry80%5C%22%20style%3D%5C%22width%3A%20699px%3B%5C%22%3E%3Ccolgroup%20data-id%3D%5C%22c1e4a4ebk-13sq0si5o8f40%5C%22%3E%3Ccol%20span%3D%5C%221%5C%22%20data-id%3D%5C%22c1e7pyi9s-8rxaqjr9vgw0%5C%22%20width%3D%5C%22155%5C%22%20%2F%3E%3Ccol%20span%3D%5C%221%5C%22%20data-id%3D%5C%22c1e7pyi9s-1lzblxbpt11c0%5C%22%20width%3D%5C%22155%5C%22%20%2F%3E%3Ccol%20span%3D%5C%221%5C%22%20data-id%3D%5C%22c1e7pyi9s-e77tpbfvsg80%5C%22%20width%3D%5C%22145.703%5C%22%20%2F%3E%3Ccol%20span%3D%5C%221%5C%22%20data-id%3D%5C%22c1e7pyi9s-bxpjk919yeo00%5C%22%20width%3D%5C%2285.797%5C%22%20%2F%3E%3Ccol%20span%3D%5C%221%5C%22%20data-id%3D%5C%22c1e7pyi9s-empqi20j1cw00%5C%22%20width%3D%5C%22155%5C%22%20%2F%3E%3C%2Fcolgroup%3E%3Ctbody%20data-id%3D%5C%22t1dr9qg4g-7s3wu48qoi80%5C%22%3E%3Ctr%20data-id%3D%5C%22t1dr9j7ls-2wpu8eokmqw00%5C%22%20style%3D%5C%22height%3A%2015px%3B%5C%22%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-jssuokfof1s00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-c5dvyjeg1v40%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-2r19f6677us00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-i4kqk7yjfaw00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-dh6gx3xt72800%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-gbnl9m2tkwo00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-hcloesblnj400%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-6xkwc653xw000%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-azfhs9vmnug00%5C%22%20class%3D%5C%22table-last-row%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-61b10xpt38w00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%20data-id%3D%5C%22t1dr9j7ls-kkc30srmly800%5C%22%20style%3D%5C%22height%3A%2015px%3B%5C%22%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-7vop81jlvrw00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-c0dbdm0k74g00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-ak3ae89tc3400%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-dr4iubvhuow00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-93rwa1gpr1g00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-63fwjxp9ewg00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-cwxbp2ariqg00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-80yt5slh06w00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-eisnxazlubk00%5C%22%20class%3D%5C%22table-last-row%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-hpi4z6dzs0w00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%20data-id%3D%5C%22t1dr9j7ls-fte43g7zago00%5C%22%20style%3D%5C%22height%3A%2015px%3B%5C%22%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-825rfttivjo00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-6hfggs76w5k00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-1srsbkz8gwdc0%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-ctw7rq4prwo00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-clzrm1ec1zc00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-8lqm3t7v8bg00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-8lc4cf9xhko00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-er46puuha7k00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-ieyfeijnha000%5C%22%20class%3D%5C%22table-last-row%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-3i6lgredy2q00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%20data-id%3D%5C%22t1dr9j7ls-9r15s8ornto00%5C%22%20style%3D%5C%22height%3A%2015px%3B%5C%22%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-452569qhpho00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-4210k4avy0g00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-lpk09f081io0%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-4bntzp13nt400%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-atnz80xdbj400%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-earvzw9k0ow00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-kcece0f6itc00%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-6n1wh5f152o00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-kfw8yxqn40w0%5C%22%20class%3D%5C%22table-last-row%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-gz10frih5bs00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3Ctr%20data-id%3D%5C%22t1dr9j7ls-7hahj52hf480%5C%22%20style%3D%5C%22height%3A%2015px%3B%5C%22%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-6xy4lwkchi000%5C%22%20class%3D%5C%22table-last-column%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-jayrrjlufvc00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-enhrnq8jbz400%5C%22%20class%3D%5C%22table-last-column%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-8owzvc7n4ao00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-ebcpb3exgww00%5C%22%20class%3D%5C%22table-last-column%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-kh4hu21tksg00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-jo0eiyyb6mw00%5C%22%20class%3D%5C%22table-last-column%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-5wyf69l40r000%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3Ctd%20data-id%3D%5C%22tqf9l46og-8icyx3eh11000%5C%22%20class%3D%5C%22table-last-column%20table-last-row%5C%22%3E%3Cp%20data-id%3D%5C%22p1dr9j7ls-jfdfgqqz63s00%5C%22%3E%3Cbr%20%2F%3E%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%2Ftbody%3E%3C%2Ftable%3E%22%7D" data-card-type="block" data-card-key="table" data-id="d852dfo74-67pq9n4gf0o00" data-card-editable="true" class=""><div data-card-element="body"><span data-card-element="left" data-transient-element="true">&ZeroWidthSpace;</span><div data-transient-attributes="*" data-card-element="center" contenteditable="false"><div data-transient-attributes="*" class="table-wrapper"><div data-element="ui" class="table-header"><div class="table-header-item"></div></div><div data-transient-attributes="*" class="table-viewport data-scrollable scroll-x" style="position: relative;"><div data-element="ui" class="table-cols-header" style="width: 699px;"><div class="table-col-delete-button" style="display: none;"><span class="data-icon data-icon-delete"></span></div><div class="table-col-add-button"><span class="data-icon data-icon-plus"></span><div class="table-col-add-split-button"></div></div><div class="table-cols-header-item" draggable="true" style="width: 155.892px;">
            <div class="col-dragger">
                <span class="data-icon data-icon-drag"></span>
                <span class="drag-info"></span>
            </div>
            <div class="cols-trigger" style="height: 205px;"></div>
        </div><div class="table-cols-header-item" draggable="true" style="width: 155.892px;">
            <div class="col-dragger">
                <span class="data-icon data-icon-drag"></span>
                <span class="drag-info"></span>
            </div>
            <div class="cols-trigger" style="height: 205px;"></div>
        </div><div class="table-cols-header-item" draggable="true" style="width: 145.834px;">
            <div class="col-dragger">
                <span class="data-icon data-icon-drag"></span>
                <span class="drag-info"></span>
            </div>
            <div class="cols-trigger" style="height: 205px;"></div>
        </div><div class="table-cols-header-item" draggable="true" style="width: 85.4892px;">
            <div class="col-dragger">
                <span class="data-icon data-icon-drag"></span>
                <span class="drag-info"></span>
            </div>
            <div class="cols-trigger" style="height: 205px;"></div>
        </div><div class="table-cols-header-item" draggable="true" style="width: 155.892px;">
            <div class="col-dragger">
                <span class="data-icon data-icon-drag"></span>
                <span class="drag-info"></span>
            </div>
            <div class="cols-trigger" style="height: 205px;"></div>
        </div>
    </div><table class="data-table" data-id="t3a1y6rew-i7pa8t7qry80" style="width: 699px;" data-transient-attributes="class"><colgroup data-id="c1e4a4ebk-13sq0si5o8f40"><col span="1" data-id="c1e7pyi9s-8rxaqjr9vgw0" width="155"><col span="1" data-id="c1e7pyi9s-1lzblxbpt11c0" width="155"><col span="1" data-id="c1e7pyi9s-e77tpbfvsg80" width="145"><col span="1" data-id="c1e7pyi9s-bxpjk919yeo00" width="85"><col span="1" data-id="c1e7pyi9s-empqi20j1cw00" width="155"></colgroup><tbody data-id="t1dr9qg4g-7s3wu48qoi80"><tr data-id="t1dr9j7ls-2wpu8eokmqw00" style="height: 15px;"><td data-id="tqf9l46og-jssuokfof1s00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-c5dvyjeg1v40"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-2r19f6677us00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-i4kqk7yjfaw00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-dh6gx3xt72800" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-gbnl9m2tkwo00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-hcloesblnj400" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-6xkwc653xw000"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-azfhs9vmnug00" class="table-last-row" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-61b10xpt38w00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td></tr><tr data-id="t1dr9j7ls-kkc30srmly800" style="height: 15px;"><td data-id="tqf9l46og-7vop81jlvrw00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-c0dbdm0k74g00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-ak3ae89tc3400" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-dr4iubvhuow00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-93rwa1gpr1g00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-63fwjxp9ewg00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-cwxbp2ariqg00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-80yt5slh06w00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-eisnxazlubk00" class="table-last-row" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-hpi4z6dzs0w00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td></tr><tr data-id="t1dr9j7ls-fte43g7zago00" style="height: 15px;"><td data-id="tqf9l46og-825rfttivjo00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-6hfggs76w5k00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-1srsbkz8gwdc0" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-ctw7rq4prwo00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-clzrm1ec1zc00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-8lqm3t7v8bg00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-8lc4cf9xhko00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-er46puuha7k00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-ieyfeijnha000" class="table-last-row" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-3i6lgredy2q00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td></tr><tr data-id="t1dr9j7ls-9r15s8ornto00" style="height: 15px;"><td data-id="tqf9l46og-452569qhpho00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-4210k4avy0g00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-lpk09f081io0" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-4bntzp13nt400"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-atnz80xdbj400" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-earvzw9k0ow00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-kcece0f6itc00" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-6n1wh5f152o00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-kfw8yxqn40w0" class="table-last-row" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-gz10frih5bs00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td></tr><tr data-id="t1dr9j7ls-7hahj52hf480" style="height: 15px;"><td data-id="tqf9l46og-6xy4lwkchi000" class="table-last-column" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-jayrrjlufvc00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-enhrnq8jbz400" class="table-last-column" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-8owzvc7n4ao00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-ebcpb3exgww00" class="table-last-column" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-kh4hu21tksg00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-jo0eiyyb6mw00" class="table-last-column" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-5wyf69l40r000"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td><td data-id="tqf9l46og-8icyx3eh11000" class="table-last-column table-last-row" data-transient-attributes="table-cell-selection"><div class="table-main-content" data-transient-attributes="contenteditable" contenteditable="true" data-element="editable"><p data-id="p1dr9j7ls-jfdfgqqz63s00"><br></p></div><div class="table-main-bg"><div class="table-main-border-top"></div><div class="table-main-border-right"></div><div class="table-main-border-bottom"></div><div class="table-main-border-left"></div></div></td></tr></tbody></table><div data-element="ui" class="table-placeholder"></div><div data-element="ui" class="table-highlight"></div><div data-element="ui" class="data-scrollbar data-scrollbar-x" style="left: 0px; bottom: 0px;"><div class="data-scrollbar-trigger" style="width: 739px; display: none; left: 0px;"></div></div><div data-element="ui" class="scrollbar-shadow-left" style="display: none; left: 0px;"></div><div data-element="ui" class="scrollbar-shadow-right" style="display: none; left: 715px;"></div></div><div data-element="ui" class="table-rows-header"><div class="table-row-delete-button" style="display: none;"><span class="data-icon data-icon-delete"></span></div><div class="table-row-add-button" style="display: none;"><span class="data-icon data-icon-plus"></span><div class="table-row-add-split-button"></div></div><div class="table-rows-header-item" draggable="true" style="height: 38.3594px;">
                <div class="row-dragger">
                    <span class="data-icon data-icon-drag"></span>
                    <span class="drag-info"></span>
                </div>
                <div class="rows-trigger" style="width: 712px;"></div>
            </div><div class="table-rows-header-item" draggable="true" style="height: 38.3594px;">
                <div class="row-dragger">
                    <span class="data-icon data-icon-drag"></span>
                    <span class="drag-info"></span>
                </div>
                <div class="rows-trigger" style="width: 712px;"></div>
            </div><div class="table-rows-header-item" draggable="true" style="height: 38.3594px;">
                <div class="row-dragger">
                    <span class="data-icon data-icon-drag"></span>
                    <span class="drag-info"></span>
                </div>
                <div class="rows-trigger" style="width: 712px;"></div>
            </div><div class="table-rows-header-item" draggable="true" style="height: 38.3594px;">
                <div class="row-dragger">
                    <span class="data-icon data-icon-drag"></span>
                    <span class="drag-info"></span>
                </div>
                <div class="rows-trigger" style="width: 712px;"></div>
            </div><div class="table-rows-header-item" draggable="true" style="height: 38.3594px;">
                <div class="row-dragger">
                    <span class="data-icon data-icon-drag"></span>
                    <span class="drag-info"></span>
                </div>
                <div class="rows-trigger" style="width: 712px;"></div>
            </div>
        </div><div data-element="ui" class="table-menubar"><div class="table-menubar-item" data-element="ui" data-action="cut">
                <span class="data-icon data-icon-table-cut"></span>剪切</div><div class="table-menubar-item" data-element="ui" data-action="copy">
                <span class="data-icon data-icon-table-copy"></span>复制</div><div class="table-menubar-item" data-element="ui" data-action="mockPaste">
                <span class="data-icon data-icon-table-paste"></span>粘贴</div><div class="split"></div><div class="table-menubar-item" data-element="ui" data-action="insertColLeft">
                <span class="data-icon data-icon-table-insert-col-left"></span>左边插入 <input type="text" maxlength="3" class="table-menubar-item-input"> 列</div><div class="table-menubar-item" data-element="ui" data-action="insertColRight">
                <span class="data-icon data-icon-table-insert-col-right"></span>右边插入 <input type="text" maxlength="3" class="table-menubar-item-input"> 列</div><div class="table-menubar-item" data-element="ui" data-action="insertRowUp">
                <span class="data-icon data-icon-table-insert-row-up"></span>上方插入 <input type="text" maxlength="3" class="table-menubar-item-input"> 行</div><div class="table-menubar-item" data-element="ui" data-action="insertRowDown">
                <span class="data-icon data-icon-table-insert-row-down"></span>下方插入 <input type="text" maxlength="3" class="table-menubar-item-input"> 行</div><div class="split"></div><div class="table-menubar-item" data-element="ui" data-action="mergeCell">
                <span class="data-icon data-icon-table-merge-cell"></span>合并单元格</div><div class="table-menubar-item" data-element="ui" data-action="splitCell">
                <span class="data-icon data-icon-table-split-cell"></span>拆分单元格</div><div class="split"></div><div class="table-menubar-item" data-element="ui" data-action="removeCol">
                <span class="data-icon data-icon-table-remove-col"></span>删除选中列</div><div class="table-menubar-item" data-element="ui" data-action="removeRow">
                <span class="data-icon data-icon-table-remove-row"></span>删除选中行</div><div class="split"></div><div class="table-menubar-item" data-element="ui" data-action="removeTable">
                <span class="data-icon data-icon-table-remove-table"></span>删除表格</div><div class="split"></div><div class="table-menubar-item" data-element="ui" data-action="clear">
                <span class="data-icon data-icon-table-clear"></span>清空内容</div></div></div></div><span data-card-element="right" data-transient-element="true">&ZeroWidthSpace;</span></div></div>`
  return  strhtml;
};
