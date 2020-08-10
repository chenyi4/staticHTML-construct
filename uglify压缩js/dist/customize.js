var allLanguage = top.languageInit.allLanguage;
var deleted = allLanguage["delete"]; //删除
var disable = top.languageInit.allLanguage.disable; //停用
var copy = top.languageInit.allLanguage.copy; //复制
var findBack = top.languageInit.allLanguage.findBack; //查找带会
function cusdatetimepicker(obj){
	//去除页面上的<i class="fa fa-calendar"></i>
	$(".fa-calendar").remove();
	if(obj==undefined){
		obj=$(document);
	}
	if(obj.find( ".datepicker").length>0){
		obj.find(".datepicker" ).datepicker({
	    	changeMonth: true, 
	    	changeYear: true,
	    	yearRange: '1920:2099',
	    	minDate:new Date('1920-01-01'),
	    	maxDate:new Date('2099-12-31'),
	    	dateFormat: "yy-mm-dd",
	    	showOn: "button",
	    	buttonImage: "./../../../../api-b/img/icon/date.jpg",
	    	buttonImageOnly: true});
	}
	if(obj.find( ".datetimepicker" ).length>0){
		obj.find(".datetimepicker").datetimepicker({
	    	changeMonth: true, 
	    	changeYear: true,
	    	yearRange: '1920:2099',
	    	minDate:new Date('1920-01-01 00:00'),
	    	maxDate:new Date('2099-12-31 23:59'),
			dateFormat: "yy-mm-dd",
			showOn: "button",
			buttonImage: "./../../../../api-b/img/icon/date.jpg",
			buttonImageOnly: true})
	}
	if(obj.find( ".timepicker" ).length>0){
		obj.find(".timepicker").timepicker({
	    	showOn: "button",
	    	buttonImage: "./../../../../api-b/img/icon/date.jpg",
	    	buttonImageOnly: true,	    	
	    	beforeShow:function(input){
	    		//EngineeringWorkHours[0].startDate
	    		if(($(input).attr("name").indexOf("startDate")!=-1 || $(input).attr("name").indexOf("endDate")!=-1) && $(input).attr("name").indexOf("EngineeringWorkHours")!=-1){
	    			if($(input).attr("name").indexOf("EngineeringWorkHours[0].startDate")==-1){
	    				if($(input).closest("tbody").find('[name="EngineeringWorkHours[0].startDate"]').val()==""){
	    					top.layer.alert(top.languageInit.allLanguage.selectFirstStartTime,{
	    						btn: [top.languageInit.allLanguage.sure],
	    						title: top.languageInit.allLanguage.info
	    					});

	    					return false
	    				}
	    			}
	    		}
	    	}
	    });
	}
	
	//disabled 的input ui-datepicker-trigger需要divDisabled
	$('.ui-datepicker-trigger').each(function(){
		if($(this).prev().is(':disabled')){
			$(this).addClass('divDisabled');
		}
	})
	
}

//引入
function cusImport(importUrl){
	console.log(importUrl)
	layui.use(['element','upload'], function() {
    	element = layui.element;
    	upload = layui.upload;
    	var url = importUrl;
    	//指定允许上传的文件类型
    	upload.render({
    	  elem: '#uploadExcel'
    	  ,url: url
    	  ,accept: 'file' //普通文件
          ,multiple: true
    	  ,done: function(res){
    	      console.log(res);
			  if(res.header.status==200){
    			  top.layer.msg('成功！',{time: 3000});
    		  }else{
    			  top.layer.alert( res.header.statusContent ); 
    		  }
    	   }
    	});
    });
}

//layui引用
layui.use('layer', function () {
    var layer = layui.layer;
});

//上传附件
function upload(generalId,pageKey,uploadUrl){
	layui.use('upload', function(){
		  var upload = layui.upload;
		  //渲染的文件处理
		  //var files = this.files = obj.pushFile();		
		  //多文件列表示例
		  var demoListView = $('#demoList');
		  
		  var uploadType=editParm5();
		  if(uploadType==top.languageInit.allLanguage.picup){
			  uploadType = "image";
		  }else if(uploadType==top.languageInit.allLanguage.uploadJobGuide){
			  uploadType = "noImage";
		  }else{
			  uploadType = "all";
		  }
		  
		  var acceptType1 = "";
		  var acceptType2 = "";
		  if(uploadType == "image"){
			  acceptType1 = 'images';
			  acceptType2 =  '.jpg,.png,.gif,.jpeg';
		  }else if(uploadType == "noImage"){
			  acceptType1 = 'file';
			  acceptType2 =  '.pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.rar,.zip,.7z';
		  }else if(uploadType == "all"){
			  acceptType1 = 'file';
			  acceptType2 =  '.jpg,.png,.gif,.jpeg,.pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.rar,.zip,.7z';
		  }
		  
		  uploadListIns = upload.render({
		    elem: '#testList'
		    ,url:  uploadUrl
		    ,size:1024
		    ,accept:acceptType1
		    ,acceptMime: acceptType2
		    ,data:{"generalId":generalId,"pageKey":pageKey}  
		    ,multiple: true
		    ,auto: false
		    ,bindAction: '#testListAction'
		    ,choose: function(obj){  
		    
		     var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
		      
		      //读取本地文件
		      obj.preview(function(index, file, result){
		        console.log(file); //得到文件对象
		        
		        //空文件
		      if(file.size == 0){
				  top.layer.alert(top.languageInit.allLanguage.uploadNotEmpty,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				  });

		    	  return false;
		      }
		        
		        var tr = $(['<tr id="upload-'+ index +'">'
		          ,'<td>'+ file.name +'</td>'
		          ,'<td>'+ (file.size/1024).toFixed(1) +'kb</td>'
		          ,'<td>'+top.languageInit.allLanguage.waitForUpload+'</td>'
		          ,'<td>'
		            ,'<button class="layui-btn layui-btn-xs demo-view layui-hide">'+top.languageInit.allLanguage.view+'</button>'
		            ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">'+top.languageInit.allLanguage.returnMission+'</button>'
		            ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">'+top.languageInit.allLanguage.delete+'</button>'
		          ,'</td>'
		          ,'<td></td>'
		        ,'</tr>'].join(''));
		        
		        //单个重传
		        tr.find('.demo-reload').on('click', function(){
		          obj.upload(index, file);
		        });
		        		        
		        demoListView.append(tr);
		      });
		    }
		    
		    ,done: function(res, index, upload){
		      console.log(JSON.stringify(res));
		      if(res.code == "1"){ //上传成功
		        var tr = demoListView.find('tr#upload-'+ index)
		        ,tds = tr.children();
		        tds.eq(2).html('<span style="color: #5FB878;">'+top.languageInit.allLanguage.upSuccess+'</span>');
		        //tds.eq(3).html(''); //清空操作
		        tds.eq(3).find('.demo-view').removeClass('layui-hide'); //显示查看
		        //查看 链接赋值
		        tds.eq(3).find('.demo-view').attr("url",res.object.url);
		        //id隐藏框 赋值
		        tds.eq(4).text(res.object.id)
		        return delete this.files[index]; //删除文件队列已经上传成功的文件
		      }else{
		    	  var tr = demoListView.find('tr#upload-'+ index)
			      ,tds = tr.children();
			      if(res.code == "3"){
			      	tds.eq(2).html('<span style="color: #FF5722;">'+top.languageInit.allLanguage.contentRepeat+'</span>');
			      }else{
			      	tds.eq(2).html('<span style="color: #FF5722;">'+top.languageInit.allLanguage.upLoadFail+'</span>');
			      }
			      
			      
			      //tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
		      }
		     // this.error(index, upload);
		    }
		    ,error: function(index, upload){
		      var tr = demoListView.find('tr#upload-'+ index)
		      ,tds = tr.children();
		      tds.eq(2).html('<span style="color: #FF5722;">'+top.languageInit.allLanguage.upLoadFail+'</span>');
		      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
		    }
		  }); 
		});
	
	$('#testListAction').click(function(){
		if($('#demoList tr').length==0){
			top.layer.alert(top.languageInit.allLanguage.selectFileAndUpload,{
	        	btn: [top.languageInit.allLanguage.sure],
	        	title: top.languageInit.allLanguage.info
	        });
		}
	})
	
}

//上传附件 查看
function attView(){
	$(document).on('click', ".demo-view", function () {
		var url = $(this).attr("url");
		
		//文件打不开，自动下载，不需要执行下面
		var urlArr = url.split(".");
		var suffix = urlArr.slice(Number(urlArr.length)-1);
		//.jpg,.png,.gif,.jpeg
		if(suffix != "jpg" && suffix != "png" && suffix != "gif" && suffix != "jpeg" && suffix != "pdf"){
			// 创建a标签
	        let linkNode = document.createElement('a');
	        linkNode.style.display = 'none';
	        //只下载，不打开(???)
	        linkNode.download = $(this).closest('tr').find('td').eq(0).text();
	        //链接
	        linkNode.href = url;
	        // 点击
	        document.body.appendChild(linkNode);
	        linkNode.click();
	        // 移除
	        document.body.removeChild(linkNode);
	        
			return false
		}
		
		var url = $(this).attr("url");
		
		////todotodo
		//var url1 = url.replace("http://api.gateway.com:8080","http://10.12.42.71:8080")
		top.layer.open({
			  type: 2,
			  title: false,
			  closeBtn: 0,
			  area: ['800px','600px'],
			  skin: 'layui-layer-nobg', //没有背景色
			  shadeClose: true,
			  content: url,
			  success: function(layero){
				  layero.find("iframe").contents().find("body img").wrap("<div class='imgWrap' style='display:flex;justify-content:center;align-items:center;'></div>");
				  var width1 = layero.find("iframe").contents().find("body img").width();
				  var height1 = layero.find("iframe").contents().find("body img").height();
				  
				  if(width1 > screen.availWidth*0.8){
					  layero.find("iframe").contents().find("body img").width(screen.availWidth*0.8);
					  if(layero.find("iframe").contents().find("body img").height()> screen.availHeight*0.8){
						  layero.find("iframe").contents().find("body img").height(parseInt(screen.availHeight*0.8));
						  layero.find("iframe").contents().find("body img").width("auto");
						  layero.find("iframe").contents().find("body img").width(parseInt(layero.find("iframe").contents().find("body img").width()));
					  }
				  }
				  
				  width1 = layero.find("iframe").contents().find("body img").width();
				  height1 = layero.find("iframe").contents().find("body img").height();
				  
				  var top1 = parseFloat(layero.css("top"));
				  var left1 = parseFloat(layero.css("left")); 
				  var top2 = (600-height1)/2+top1;
				  var left2 = (800-width1)/2+left1;
				  
				  layero.css({"width":width1,"height":height1,"top":top2,"left":left2});
				  layero.find("iframe").css({"width":width1,"height":height1,"top":top2,"left":left2});
			  }
		});
	})
}

//上传附件 删除
function attDel(){
	$(document).on('click', ".demo-delete", function () {
		var tr1 = $(this).closest("tr");
  		var id1 = tr1.find("td:last-child").text();
  		var parentId = editParm3();
  	    var type = editParm4();
  		var url= testDomainName + '/api-b/commonRoute/deleteFile/'+id1+"/"+parentId+"/"+type;
			top.layer.confirm(top.languageInit.allLanguage.sureToDelete, {
				  btn: [top.languageInit.allLanguage.sure, top.languageInit.allLanguage.cancelSet], // 可以无限个按钮
				  title: top.languageInit.allLanguage.info
				}, 
				function(index, layero){
					tr1.remove();
					//uploadListIns.config.elem.next()[0].value = ''; // 清空input file值，以免删除后出现同名文件不可选
					if(id1!=""){
						$.ajax({
  						 url: url,
  				         type: "get",
  				         dataType: 'json',
  				         contentType: 'application/json',
  				         async: false,
  				         success: function (result) {
  				        	 top.layer.msg(top.languageInit.allLanguage.success);		
  				         },
  				         error: function () {
  				        	 top.layer.msg(top.languageInit.allLanguage.fail);		
  				         }
  					 });
					}
					// 上传附件 删除 传id
					top.layer.close(index);
				}, 
				function(index){
				  // 按钮【按钮二】的回调
					
				});
		
		
	})
}

//地区联动
function areaChange(areaChangeUrl){
	$(document).on('change', '[name$=".country"],[name$=".area"],[name$=".province"],[name$=".city"]', function () {
        var country = $(this);
        var countryval = $(this).val();
        var countryname = $(this).attr("name").split(".")[1];
        var custabcons = country.closest(".custabcons");

        var area = custabcons.find('[name$=".area"]');
        var province = custabcons.find('[name$=".province"]');
        var city = custabcons.find('[name$=".city"]');

        if (countryname == "country") {
            area.html('<option value=0>'+top.languageInit.allLanguage.pleaseChoose+'</option>');
            province.html('<option value=0>'+top.languageInit.allLanguage.pleaseChoose+'</option>');
            city.html('<option value=0>'+top.languageInit.allLanguage.pleaseChoose+'</option>');
        } else if (countryname == "area") {
            province.html('<option value=0>'+top.languageInit.allLanguage.pleaseChoose+'</option>');
            city.html('<option value=0>'+top.languageInit.allLanguage.pleaseChoose+'</option>');
        } else if (countryname == "province") {
            city.html('<option value=0>'+top.languageInit.allLanguage.pleaseChoose+'</option>');
        }

        custabcons.find('[name$=".' + countryname + 'Id"]').val(countryval);
        
        $.ajax({
            url: areaChangeUrl+ countryval,
            type: "get",
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                console.log(result);
                if(typeof result == "string"){
                	result = JSON.parse(result);
                }
                $.each(result, function (i, e) {
                    if (countryname == "country") {
                        area.append('<option value=' + e.id + '>' + e.name + '</option>');
                    } else if (countryname == "area") {
                        province.append('<option value=' + e.id + '>' + e.name + '</option>');
                    } else if (countryname == "province") {
                        city.append('<option value=' + e.id + '>' + e.name + '</option>');
                    }
                })
            },
            error: function () {
                alert(top.languageInit.allLanguage.errorLinkage);
            }
        })


    })
    
}

//jqgrid selectedId rowData 方法里面引用
function rowData(obj){
	//找search页面里面的table 区分有树和没树的页面
    var length = $(obj).closest("body").find("iframe[src*='search']").length;
	var table = "";
    if (length != 0) {
        table = $(obj).closest("body").find("iframe[src*='search']").contents().find("#list");
    } else {
        table = $(obj).closest("body").find("#list");
    }
    //找search页面里面的table选中行
    var selectedId = table.jqGrid("getGridParam", "selarrrow");
    if (selectedId.length > 1) {
        top.layer.alert(top.languageInit.allLanguage.onlyChooseOne,{
        	btn: [top.languageInit.allLanguage.sure],
        	title: top.languageInit.allLanguage.info
        });
        return false
    }
    else if(selectedId.length == 0){
    	top.layer.alert(top.languageInit.allLanguage.pleaseChooseOne,{
    		btn: [top.languageInit.allLanguage.sure],
        	title: top.languageInit.allLanguage.info
        });
        return false
    }
    //取选中行中需要的值
    var rowData = table.jqGrid("getRowData", selectedId);
    return rowData;
}

//退出 方法里面引用
function closetab(){
    top.$(".layui-tab-title>.layui-this>.layui-tab-close").click();
}

//编码规则 change
function codeRule(){
	// 1常量 =  设置值、分隔符     可编辑
	// 2选择日期格式 = 元素来源（页面选中的业务对象字段中，设置为日期类型的字段）、格式（默认YYYY.MM.DD）、分隔符、编码依据     可编辑
	// 3选择文本格式 = 元素来源（页面选中的业务对象字段中，设置为文本类型的字段）、长度、分隔符、编码依据     可编辑
	//4选择基础资料类型 = 元素来源（页面选中的业务对象字段中，设置为基础资料类型的字段）、长度、分隔符、编码依据可编辑 
	//5选择流水号 = 起始值（默认值1）、步长（默认值1）、分隔符、长度（默认4）     可编辑
	if($('select[name^="CodeRuleDetail["]').filter('select[name$=".type"]').length>0){
		var select1 = $('select[name^="CodeRuleDetail["]').filter('select[name$=".type"]');
	    select1.each(function(ii,ee){
	        var tr1 = $(this).closest("tr");
	        //只读
	        tr1.find("input:text").attr("readonly","readonly");
	        
	        //区分可编辑和不可编辑的查找带回
	        tr1.find(".back").addClass("divDisabled");
	        tr1.find(".back").closest("td").removeClass("edit-inline");
	        //select 没有只读，只能disabled / 排除 类型 select
	        tr1.find("select:not([name$='.type'])").attr("disabled","disabled");

	        var val1 = $(this).val();
	        if(val1 == "1"){
	            var arr1 = ["setValue","codeSeparator"];
	        }
	        else if(val1 == "2"){
	            var arr1 = ["source","format","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "3"){
	            var arr1 = ["source","length","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "4"){
	            var arr1 = ["length","codeSeparator"];
	        }
	        else if(val1 == "5"){
	            var arr1 = ["startValue","stepSize","codeSeparator","length"];
	        }

	        $.each(arr1,function(i,e){
	            tr1.find('[name$="'+e+'"]').removeAttr("readonly");
	            tr1.find('[name$="'+e+'"]').removeAttr("disabled");
	            tr1.find('[name$="'+e+'"]').next().removeClass("divDisabled");
	        })

	        //不能直接赋值为空，会影响修改页面的传值
	        //tr1.find("input:text").val('');
	        if(val1 == "2"){
	        	var lengthVal = tr1.find('[name$="length"]').val()=='' ? '10' : tr1.find('[name$="length"]').val();
	        	tr1.find('[name$="length"]').val(lengthVal);
	        	var formatVal = tr1.find('[name$="format"]').val()=='' ? 'YYYY.MM.dd' : tr1.find('[name$="format"]').val();
	            tr1.find('[name$="format"]').val(formatVal);
	        }
	        else if(val1 == "5"){
	        	var startValueVal = tr1.find('[name$="startValue"]').val()=='' ? '1' :tr1.find('[name$="startValue"]').val();
	            tr1.find('[name$="startValue"]').val(startValueVal);
	            var stepSizeVal = tr1.find('[name$="stepSize"]').val()=='' ? '1' :tr1.find('[name$="stepSize"]').val();
	            tr1.find('[name$="stepSize"]').val(stepSizeVal);
	            //不能直接赋值为4，会影响修改页面的传值
	            //tr1.find('[name$="length"]').val("4");
	        }
	    })
	}
    

    //CodeRuleDetail[0].type
    $(document).on('change', 'select[name$=".type"]', function () {
        //$('select[name^="CodeRuleDetail["]').filter('select[name$=".type"]').change(function(){
        var tr1 = $(this).closest("tr");
        //只读
        tr1.find("input:text").attr("readonly","readonly");
        //区分可编辑和不可编辑的查找带回
        tr1.find(".back").addClass("divDisabled");
        tr1.find(".back").closest("td").removeClass("edit-inline");
        //select 没有只读，只能disabled / 排除 类型 select
        tr1.find("select:not([name$='.type'])").attr("disabled","disabled");

        var val1 = $(this).val();
        if(val1 == "1"){
            var arr1 = ["setValue","codeSeparator"];
        }
        else if(val1 == "2"){
            var arr1 = ["source","format","codeSeparator","codeBasis"];
        }
        else if(val1 == "3"){
            var arr1 = ["source","length","codeSeparator","codeBasis"];
        }
        else if(val1 == "4"){
            var arr1 = ["source","length","codeSeparator","codeBasis","sourceProperty"];
        }
        else if(val1 == "5"){
            var arr1 = ["startValue","stepSize","codeSeparator","length"];
        }

        $.each(arr1,function(i,e){
        	tr1.find('[name$="'+e+'"]').removeAttr("readonly");
        	tr1.find('[name$="'+e+'"]').removeAttr("disabled");
            tr1.find('[name$="'+e+'"]').next().removeClass("divDisabled");
        })


        tr1.find("input:text").val('');
        if(val1 == "2"){
        	tr1.find('[name$="length"]').val("10");
            tr1.find('[name$="format"]').val("YYYY.MM.dd");
        }
        else if(val1 == "5"){
            tr1.find('[name$="startValue"]').val("1");
            tr1.find('[name$="stepSize"]').val("1");
            tr1.find('[name$="length"]').val("4");
        }
    })
    
    //设置值和格式的长度     赋值给长度
    $(document).on('keyup', '[name$=".setValue"]', function () {
    	$(this).closest("tr").find('[name$=".length"]').val(($(this).val()).length);
    })
    
}

//编码示例
function codingExample(){
	//获取行里的   CodeRuleDetail[0].type，决定去行里面的什么生成该行的示例
	var codingExampleStr='';
	var CodeRuleDetailType = $('[name^="CodeRuleDetail"]:visible, [name^="OtherCodeRuleDetail"]:visible').filter('[name$="type"]').not('th');
	if(CodeRuleDetailType.length>0){
		var lengthCount = 0;
		CodeRuleDetailType.eq(0).closest("tbody").find("tr").each(function(i,e){
			var trLength = CodeRuleDetailType.eq(0).closest("tbody").find("tr").length;
			//类型 值
			var thisTrCodeRuleDetailTypeVal = $(e).find('[name$="type"]').val();
			var thisSelectName = $(e).find('[name$="type"]').attr('name').split('[')[0];
			//分割符 值
			var codeSeparatorV = $(e).find('[name$="codeSeparator"]').val();
			if(thisTrCodeRuleDetailTypeVal==1){
				//常量     setValue     codeSeparator
				var setValueV = $(e).find('[name$="setValue"]').val();
				var testText = setValueV;
			}else if(thisTrCodeRuleDetailTypeVal==2 || 
					(thisSelectName == 'OtherCodeRuleDetail' && thisTrCodeRuleDetailTypeVal==3)){
				//日期字段     format     codeSeparator
				//创建日期 单据日期
				var formatV = $(e).find('[name$="format"]').val();
				var testText = formatV;
			}else if( (thisSelectName == 'CodeRuleDetail' && thisTrCodeRuleDetailTypeVal==3) ||
						(thisSelectName == 'OtherCodeRuleDetail' && thisTrCodeRuleDetailTypeVal==4) || 
						(thisSelectName == 'OtherCodeRuleDetail' && thisTrCodeRuleDetailTypeVal==6) || 
						(thisSelectName == 'OtherCodeRuleDetail' && thisTrCodeRuleDetailTypeVal==7) ){
				//文本字段     length     codeSeparator
				var lengthV = $(e).find('[name$="length"]').val();
				var testText = "测试文本测试文本测试";
				if(thisSelectName == 'OtherCodeRuleDetail'){
					if(thisTrCodeRuleDetailTypeVal==4){
						testText = "供应商名称供应商名称";
					}else if(thisTrCodeRuleDetailTypeVal==6){
						testText = "客户客户客户客户客户";
					}else if(thisTrCodeRuleDetailTypeVal==7){
						testText = "部门部门部门部门部门";
					}
				}
//				while (lengthV>testText.length){
//					testText+=testText;
//				}
				if(lengthV<testText.length){
					testText = testText.substr(0,lengthV);
				}
			}else if(thisSelectName == 'CodeRuleDetail' && thisTrCodeRuleDetailTypeVal==4){
				//基础资料     length     codeSeparator
				var lengthV = $(e).find('[name$="length"]').val();
				var testText = "WL00000001";
//				while (lengthV>testText.length+3){
//					testText+="0";
//				}
//				testText = "WL"+testText+"1";
				if(lengthV<testText.length){
					testText = testText.substr(0,lengthV);
				}
			}else if(thisTrCodeRuleDetailTypeVal==5){
				//流水号     length     codeSeparator
				var lengthV = $(e).find('[name$="length"]').val();
				var testText = "0000000001";
//				while (lengthV>testText){
//					testText+=testText;
//				}
				if(lengthV<testText.length){
					testText = testText.substr(testText.length - lengthV,testText.length); 
				}
			}
			//区分最后一行
			if(i==trLength-1){
				codingExampleStr+=testText;
			}else{
				codingExampleStr+=testText+codeSeparatorV;
			}
			//总长度不能大于30
			var lengthV = $(e).find('[name$="length"]').val();
			var codeSeparatorV = $(e).find('[name$="codeSeparator"]').val();
			var codeSeparatorVL=codeSeparatorV.length;
			if(lengthV==""){
				lengthV=0
			}
			if(codeSeparatorV==""){
				codeSeparatorVL=0
			}
			if(i==trLength-1){
				codeSeparatorVL=0
			}
			lengthCount = lengthCount+Number(lengthV)+Number(codeSeparatorVL);
		})
		console.log(codingExampleStr);
		//总长度totalLength
		var totalLength = CodeRuleDetailType.eq(0).closest(".custabcons").find('[name$="totalLength"]');
		totalLength.val(lengthCount);
		if(lengthCount>30){
			top.layer.alert(top.languageInit.allLanguage.totalLengthCannotExceed,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
			return false
		}else{
			//CodeRuleMain.codeDemo
			var codeDemo = CodeRuleDetailType.eq(0).closest(".custabcons").find('[name$="codeDemo"]');
			codeDemo.val(codingExampleStr);
			return true
		}
	}
}

//批号/序列号编码规则
function otherCodeRule(){    
	if($('select[name^="OtherCodeRuleDetail["]').filter('select[name$=".type"]').length>0){
		var select1 = $('select[name^="OtherCodeRuleDetail["]').filter('select[name$=".type"]');
	    select1.each(function(ii,ee){
	        var tr1 = $(this).closest("tr");
	        //只读
	        tr1.find("input:text").attr("readonly","readonly");
	        
	        //区分可编辑和不可编辑的查找带回
	        tr1.find(".back").addClass("divDisabled");
	        tr1.find(".back").closest("td").removeClass("edit-inline");
	        //select 没有只读，只能disabled / 排除 类型 select
	        tr1.find("select:not([name$='.type'])").attr("disabled","disabled");

	        var val1 = $(this).val();
	        if(val1 == "1"){
	        	//常量
	            var arr1 = ["codeSeparator","setValue"];
	        }
	        else if(val1 == "2"){
	        	//创建日期
	            var arr1 = ["format","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "3"){
	        	//单据日期
	            var arr1 = ["format","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "4"){
	        	//供应商
	            var arr1 = ["length","codeSeparator"];
	        }
	        else if(val1 == "5"){
	        	//流水号
	            var arr1 = ["length","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "6"){
	        	//客户
	            var arr1 = ["length","codeSeparator"];
	        }
	        else if(val1 == "7"){
	        	//部门
	            var arr1 = ["length","codeSeparator"];
	        }

	        $.each(arr1,function(i,e){
	        	tr1.find('[name$="'+e+'"]').removeAttr("readonly");
	        	tr1.find('[name$="'+e+'"]').removeAttr("disabled");
	            tr1.find('[name$="'+e+'"]').next().removeClass("divDisabled");
	        })
	        
	        if(val1 == "2" || val1 == "3"){
	        	var lengthVal = tr1.find('[name$="length"]').val()=='' ? '10' : tr1.find('[name$="length"]').val();
	        	tr1.find('[name$="length"]').val(lengthVal);
	        	var formatVal = tr1.find('[name$="format"]').val()=='' ? 'YYYY.MM.dd' : tr1.find('[name$="format"]').val();
	            tr1.find('[name$="format"]').val(formatVal);
	        }
	        
	    })
	}
	
	
	  $(document).on('change', 'select[name$=".type"]', function () {
		  var tr1 = $(this).closest("tr");
	        //只读
	        tr1.find("input:text").attr("readonly","readonly");
	        //区分可编辑和不可编辑的查找带回
	        tr1.find(".back").addClass("divDisabled");
	        tr1.find(".back").closest("td").removeClass("edit-inline");
	        //select 没有只读，只能disabled / 排除 类型 select
	        tr1.find("select:not([name$='.type'])").attr("disabled","disabled");

	        var val1 = $(this).val();
	        if(val1 == "1"){
	        	//常量
	            var arr1 = ["codeSeparator","setValue"];
	        }
	        else if(val1 == "2"){
	        	//创建日期
	            var arr1 = ["format","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "3"){
	        	//单据日期
	            var arr1 = ["format","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "4"){
	        	//供应商
	            var arr1 = ["length","codeSeparator"];
	        }
	        else if(val1 == "5"){
	        	//流水号
	            var arr1 = ["length","codeSeparator","codeBasis"];
	        }
	        else if(val1 == "6"){
	        	//客户
	            var arr1 = ["length","codeSeparator"];
	        }
	        else if(val1 == "7"){
	        	//部门
	            var arr1 = ["length","codeSeparator"];
	        }

	        $.each(arr1,function(i,e){
	        	tr1.find('[name$="'+e+'"]').removeAttr("readonly");
	        	tr1.find('[name$="'+e+'"]').removeAttr("disabled");
	            tr1.find('[name$="'+e+'"]').next().removeClass("divDisabled");
	        })
	        
	        if(val1 == "2" || val1 == "3"){
	        	tr1.find('[name$="length"]').val("10");
	            tr1.find('[name$="format"]').val("YYYY.MM.dd");
	        }
	        
	  });
 
  //设置值和格式的长度     赋值给长度
    $(document).on('keyup', '[name$=".setValue"]', function () {
    	$(this).closest("tr").find('[name$=".length"]').val(($(this).val()).length);
    })
    
}

//抽样方案 init的时候根据抽样类型 init check
function spTypeInitCheck( spBatchDownCheck,spBatchUpCheck,sampleAmountCheck,allowAmountCheck,rejectAmountCheck ){
	if( $('select[name="QualitySamplingPlan.spType"]').length>0 ){
		var spType = $('select[name="QualitySamplingPlan.spType"]');
		
		var value = $('[name="QualitySamplingPlan.spType"]').val();
		
		var spBatchDown = $('input[name="QualitySamplingPlanDetail[0].spBatchDown"]');
		var spBatchUp = $('input[name="QualitySamplingPlanDetail[0].spBatchUp"]');
		var sampleAmount = $('input[name="QualitySamplingPlanDetail[0].sampleAmount"]');
		var allowAmount = $('input[name="QualitySamplingPlanDetail[0].allowAmount"]');
		var rejectAmount = $('input[name="QualitySamplingPlanDetail[0].rejectAmount"]');
		
		if(value == 0){
			spBatchDown.attr('check', '');
			spBatchUp.attr('check', '');
			sampleAmount.attr('check', '');
			allowAmount.attr('check', '');
			rejectAmount.attr('check', '');
		}
		else if(value == 1){
			spBatchDown.attr('check', '');
			spBatchUp.attr('check', '');
			allowAmount.attr('check', allowAmountCheck);
			rejectAmount.attr('check', rejectAmountCheck);
			sampleAmount.attr('check', sampleAmountCheck);
		}
		else if(value == 2){
			spBatchDown.attr('check', spBatchDownCheck);
			spBatchUp.attr('check', spBatchUpCheck);
			allowAmount.attr('check', allowAmountCheck);
			rejectAmount.attr('check', rejectAmountCheck);
			sampleAmount.attr('check', sampleAmountCheck);
		}
		else if(value == 3){
			spBatchDown.attr('check', spBatchDownCheck);
			spBatchUp.attr('check', spBatchUpCheck);
			allowAmount.attr('check', allowAmountCheck);
			rejectAmount.attr('check', rejectAmountCheck);
			sampleAmount.attr('check', sampleAmountCheck);
		}
	}
}

//抽样方案 change
function sampling(){
	//全检     QualitySamplingPlan.spType
	////批量上限     QualitySamplingPlanDetail[0].spBatchUp
	////批量下限     QualitySamplingPlanDetail[0].spBatchDown
	////样本量         QualitySamplingPlanDetail[0].sampleAmount
	////允收量         QualitySamplingPlanDetail[0].allowAmount
	////拒收量         QualitySamplingPlanDetail[0].rejectAmount
	if($('[name="QualitySamplingPlan.spType"]').length!=0){
		
		var spBatchDownCheck =  $('input[name$=".spBatchDown"]').attr('check');
		var spBatchUpCheck =    $('input[name$=".spBatchUp"]').attr('check');
		var sampleAmountCheck = $('input[name$=".sampleAmount"]').attr('check');
		var allowAmountCheck =  $('input[name$=".allowAmount"]').attr('check');
		var rejectAmountCheck = $('input[name$=".rejectAmount"]').attr('check');
		
		
		
		var spTypeV = $('select[name="QualitySamplingPlan.spType"]').val();
		var tr1 = $('.custabcons[tab="'+top.languageInit.allLanguage.detailInfo+'"] table tbody tr');
		tr1.each(function(tr1i,tr1e){
			$(tr1e).find("input:text").removeAttr("readonly");
			
			var spBatchUp = $(tr1e).find('[name$="spBatchUp"]');
			var spBatchDown = $(tr1e).find('[name$="spBatchDown"]');
			var sampleAmount = $(tr1e).find('[name$="sampleAmount"]');
			var allowAmount = $(tr1e).find('[name$="allowAmount"]');
			var rejectAmount = $(tr1e).find('[name$="rejectAmount"]');
			
			//全检0     全部文本框只读
			if(spTypeV==0){
				$(tr1e).find("input:text").attr("readonly","readonly");
				//$(tr1e).find("input:text").val("");
			}
			//固定数量1     批量上限、批量下限只读
			else if(spTypeV==1){
				spBatchUp.attr("readonly","readonly");
				spBatchDown.attr("readonly","readonly");
				//$(tr1e).find("input:text").val("");
			}
		})
		
		spTypeInitCheck( spBatchDownCheck,spBatchUpCheck,sampleAmountCheck,allowAmountCheck,rejectAmountCheck );
		
		
		
		$(document).on('change', 'select[name="QualitySamplingPlan.spType"]', function () {
			var spTypeV = $(this).val();
			var tr1 = $('.custabcons[tab="'+top.languageInit.allLanguage.detailInfo+'"] table tbody tr');
			tr1.each(function(tr1i,tr1e){
				$(tr1e).find("input:text").removeAttr("readonly");
				
				var spBatchUp = $(tr1e).find('[name$="spBatchUp"]');
				var spBatchDown = $(tr1e).find('[name$="spBatchDown"]');
				var sampleAmount = $(tr1e).find('[name$="sampleAmount"]');
				var allowAmount = $(tr1e).find('[name$="allowAmount"]');
				var rejectAmount = $(tr1e).find('[name$="rejectAmount"]');
				
				//全检0     全部文本框只读
				if(spTypeV==0){
					$(tr1e).find("input:text").attr("readonly","readonly");
					$(tr1e).find("input:text").val("");
				}
				//固定数量1     批量上限、批量下限只读
				else if(spTypeV==1){
					spBatchUp.attr("readonly","readonly");
					spBatchDown.attr("readonly","readonly");
					$(tr1e).find("input:text").val("");
				}
			})
			
			spTypeInitCheck( spBatchDownCheck,spBatchUpCheck,sampleAmountCheck,allowAmountCheck,rejectAmountCheck );
		})
	}
	
}

//质检方案  检验项目查找带回 
function Inspection2(e,jsonArr,count,tbody1,rowArrE){
	if(e.indexOf("QualityInspectionPlanDetail")!=-1 && e.indexOf("testName")!=-1){
		//requireValue     rangeDown     rangeUp
		tbody1.find('[name$="['+rowArrE+'].requireValue"]', '[name$="['+rowArrE+'].rangeDown"]', '[name$="['+rowArrE+'].rangeUp"]').val('').attr('readonly',false);
		if( jsonArr[count][e.split('.')[0]+'.testJudge'] == '定性' ){
			tbody1.find('[name$="['+rowArrE+'].requireValue"]', '[name$="['+rowArrE+'].rangeDown"]', '[name$="['+rowArrE+'].rangeUp"]').attr({'readonly':true,'check':''});
		}
		else{
			//judgeType 4是范围
			var judgeTypeVal = tbody1.find('[name$="['+rowArrE+'].judgeType"]').val();
			if(judgeTypeVal == 4){
				tbody1.find('[name$="['+rowArrE+'].requireValue"]').attr({'readonly':true,'check':''});
			}else{
				tbody1.find('[name$="['+rowArrE+'].rangeDown"]', '[name$="['+rowArrE+'].rangeUp"]').attr({'readonly':true,'check':''});
			}
		}
	}
}


//质检方案 change
function Inspection(){
	//检验类型QualityInspectionPlanDetail[0].judgeType
	////0大于     1大于等于     2小于     3小于等于     4范围     5固定值
	//取值要求   QualityInspectionPlanDetail[0].requireValue
	//范围下限   QualityInspectionPlanDetail[0].rangeDown
	//范围上限   QualityInspectionPlanDetail[0].rangeUp
	////范围下限和范围上限可填时，下限大于等于上限
	var tr1 = $('.custabcons[tab="'+top.languageInit.allLanguage.detailInfo+'"] table tbody tr');
	var arr1 = ["requireValue","rangeDown","rangeUp"];
	var arr2 = ["rangeDown","rangeUp"];
	var arr3 = ["requireValue"];
	var arr1check = [];
	
	//保存初始化的check
	var tr101 = tr1.eq(0);
	$.each(arr1,function(arr1i,arr1e){
		var check = $(tr101).find('[name$="'+arr1e+'"]').attr('check');
		arr1check.push(check);
	});
	
	
	tr1.each(function(tr1i,tr1e){
		//当前行全部取消readonly
		$.each(arr1,function(arr1i,arr1e){
			//这边不加attr check 的原因是因为初始化init的时候就已经存在check
			$(tr1e).find('[name$="'+arr1e+'"]').removeAttr("readonly");
		});
		//取当前行select的值
		var judgeTypeV = $(tr1e).find('[name$="judgeType"]').val();
		// 4范围     取值要求 可填     范围下限 范围上限 readonly
		var testJudge = $(tr1e).find('[name$="testJudge"]').val();
		if(judgeTypeV == 4){
			$.each(arr3,function(arr3i,arr3e){
				$(tr1e).find('[name$="'+arr3e+'"]').attr("readonly","readonly").attr('check', '');
			})
		}
		else{
			$.each(arr2,function(arr2i,arr2e){
				$(tr1e).find('[name$="'+arr2e+'"]').attr("readonly","readonly").attr('check', '');
			})
		}
		if(testJudge == top.languageInit.allLanguage.qualitative){
			$.each(arr1,function(arr1i,arr1e){
				$(tr1e).find('[name$="'+arr1e+'"]').attr("readonly","readonly").attr('check', '');
			});
		}
	})
	
	
	
	//change
	$(document).on('change', 'select[name$="judgeType"]', function () {
		var thisTr = $(this).closest("tr");
		//当前行全部取消readonly
		$.each(arr1,function(arr1i,arr1e){
			thisTr.find('[name$="'+arr1e+'"]').removeAttr("readonly").attr('check', arr1check[arr1i]);
			thisTr.find('[name$="'+arr1e+'"]').val("");
			//去除验证错误的样式
			thisTr.find('[name$="'+arr1e+'"]').parent('td').removeClass('checkfalse');
		})
		//取当前行select的值
		var judgeTypeV = $(this).val();
		// 4范围     取值要求 可填     范围下限 范围上限 readonly
		if(judgeTypeV == 4){
			$.each(arr3,function(arr3i,arr3e){
				thisTr.find('[name$="'+arr3e+'"]').attr("readonly","readonly").attr('check', '');
			})
		}
		else{
			$.each(arr2,function(arr2i,arr2e){
				thisTr.find('[name$="'+arr2e+'"]').attr("readonly","readonly").attr('check', '');
			})
		}
		if(thisTr.find('[name$="testJudge"]').val() == top.languageInit.allLanguage.qualitative){
			$.each(arr1,function(arr1i,arr1e){
				thisTr.find('[name$="'+arr1e+'"]').attr("readonly","readonly").attr('check', '');
			});
		}
	})
}

//上限下限
//每一行的范围下限和范围上限不能有交集
//检验类型QualityInspectionPlanDetail[0].judgeType
////0大于     1大于等于     2小于     3小于等于     4范围     5固定值
//范围下限   QualityInspectionPlanDetail[0].rangeDown
//范围上限   QualityInspectionPlanDetail[0].rangeUp
////范围下限和范围上限可填时，下限大于等于上限
function lowerUpperLimit(lower,upper,select,selectVal){
	$(document).on('change', '[name$="'+lower+'"],[name$="'+upper+'"]', function () {
		var thisI = $(this);
		var thisV = $(this).val();
		var siblingsTr = thisI.closest("tr").siblings();
		var allTr = thisI.closest("tbody").find("tr");
		
		//与本行数据对比大小
		if(thisI.is('[name$="'+lower+'"]')){
			var thisRangeUpV = parseFloat(thisI.closest("tr").find('[name$="'+upper+'"]').val());
			if(thisRangeUpV==""){
				return false
			}
			if(thisV>thisRangeUpV){
				thisI.val("");
				thisI.attr("value","");
				top.layer.alert(top.languageInit.allLanguage.greaterThanUpperLimit,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});
				return false
			}else if(thisV == thisRangeUpV){
				thisI.val("");
				thisI.attr("value","");
				top.layer.alert(top.languageInit.allLanguage.equalToUpperLimit,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});
				return false
			}
		}
		else if(thisI.is('[name$="'+upper+'"]')){
			var rangeDownV = parseFloat(thisI.closest("tr").find('[name$="'+lower+'"]').val());
			if(rangeDownV==""){
				return false
			}
			if(thisV<rangeDownV){
				thisI.val("");
				thisI.attr("value","");
				top.layer.alert(top.languageInit.allLanguage.lessThanLowerLimit,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});
				return false
			}else if(thisV == rangeDownV){
				thisI.val("");
				thisI.attr("value","");
				top.layer.alert(top.languageInit.allLanguage.equalToLowerLimit,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});
				return false
			}
		}
		
		//与其它行对比数据交集
		siblingsTr.each(function(siblingsTrI,siblingsTrE){
			function selectTr(){
				var rangeDownV = parseFloat($(siblingsTrE).find('[name$="'+lower+'"]').val());
				var rangeUpV = parseFloat($(siblingsTrE).find('[name$="'+upper+'"]').val());
				var index1 = $(siblingsTrE).index()+1;
				
				var thisName = thisI.attr("name").indexOf(lower)!=-1 ? lower : upper;
				var otherName = thisName == lower ? upper : lower;
				var thisV = parseFloat(thisI.val());
				var otherVal = parseFloat(thisI.closest("tr").find('[name$="'+otherName+'"]').val());
				
				if( (otherVal<=rangeDownV && thisV>=rangeDownV && otherVal!='') || (otherVal<=rangeUpV && thisV>=rangeUpV && otherVal!='') ){
					thisI.val("");
					thisI.attr("value","");
					top.layer.alert(top.languageInit.allLanguage.theNumberEntered+index1+top.languageInit.allLanguage.intersectionBetween,{
						btn: [top.languageInit.allLanguage.sure],
						title: top.languageInit.allLanguage.info
					});

					return false
				}
				
				if(thisV == rangeDownV){
					thisI.val("");
					thisI.attr("value","");
					top.layer.alert(top.languageInit.allLanguage.theNumberEntered+index1+top.languageInit.allLanguage.equalToLowerNumber,{
						btn: [top.languageInit.allLanguage.sure],
						title: top.languageInit.allLanguage.info
					});
					return false
				}
				else if(thisV == rangeUpV){
					thisI.val("");
					thisI.attr("value","");
					top.layer.alert(top.languageInit.allLanguage.theNumberEntered+index1+top.languageInit.allLanguage.equalToUpperNumber,{
						btn: [top.languageInit.allLanguage.sure],
						title: top.languageInit.allLanguage.info
					});
					return false
				}
				else if(thisV > rangeDownV && thisV < rangeUpV){
					thisI.val("");
					thisI.attr("value","");
					top.layer.alert(top.languageInit.allLanguage.theNumberEntered+index1+top.languageInit.allLanguage.rangeBetween,{
						btn: [top.languageInit.allLanguage.sure],
						title: top.languageInit.allLanguage.info
					});
					return false
				}
			}
			if(select!=undefined){
				if($(siblingsTrE).find('[name$="'+select+'"]').val()==selectVal){
					selectTr();
				}
			}
			else{
				selectTr();
			}
			
		})


		
		
	})
}

//工作日历
function calendarInit(calendarInitUrl){
    $(".addrow, .copyrow, .delrow").hide();
    
    var custabcons1 = $(".custabcons").eq(2);
    if(custabcons1.length == 0){
    	custabcons1 = $(".custabcons[tab='"+"detailInfo"+"']");
    };
    //工作日后面的checkbox每个之间的间距 css
    custabcons1.find(".layui-input-inline :checkbox+:checkbox").css({"margin-left":"10px"});
    //工作日后面的checkbox 整个div变宽
    //custabcons1.find(".layui-input-inline :checkbox+:checkbox").closest(".layui-input-inline").css({"margin-top":"0px","width":"auto"});
    //wwj 为了让工作日和后边的星期在同一行
    custabcons1.find(".layui-input-inline :checkbox+:checkbox").closest(".layui-input-inline").css({"margin-top":"0px"});
    //工作日里面的表格限高
    custabcons1.find(".addcopydel").css({"max-height":"200px","overflow":"auto"});
    //加 生成明细信息 按钮
    var btnInit = '<button class="layui-btn layui-btn-normal calendarInit" type="button">'+top.languageInit.allLanguage.generateDetailInfo+'</button>';
    
    console.log(top.languageInit.allLanguage.detailInfo);
    
    
    
    custabcons1.find(".addcopydel").before(btnInit);
    {	//# 5219 bug 修改
    	if($('.addBody').length){
    		 var checkboxs = custabcons1.find('input[type="checkbox"]');
    		 checkboxs.attr('disabled', false); 
    	}
    }
    //审核页面按钮 disabled    layui-btn-disabled
    if(top.$("#admin-body iframe:visible").attr("src").indexOf("audit")!=-1){
        $(".calendarInit:visible").addClass("layui-btn-disabled");
        $(".calendarInit:visible").attr("disabled","disabled");
    }
    //去掉生成明细tab里面table的checkbox
    custabcons1.find(".addcopydel table :checkbox").closest("th").hide();
    custabcons1.find(".addcopydel table :checkbox").closest("td").hide();
    calendarInitClick(calendarInitUrl, custabcons1);//bug #6679 
}

function calendarInitClick(calendarInitUrl, custabcons1){ //参数修改 bug #6679 修改
	
	if( $(".calendarInit").length>0 ){
		$(".calendarInit").click(function(){
			
	        var effectiveDate = $("[name$='.effectiveDate']:visible").val();
	        var expiryDate = $("[name$='.expiryDate']:visible").val();
	     
	        if(effectiveDate == "" || expiryDate == ""){
	        	top.layer.msg(top.languageInit.allLanguage.selectDate);
	        	return;
	        }
	        var workingDay = "";
	        $("[name$='.workingDay']:visible").each(function(i,e){
	            if($(e).is(":checked")){
	                if(workingDay == ""){
	                    workingDay = $(e).val();
	                }
	                else{
	                    workingDay = workingDay+"_"+$(e).val();
	                }
	            }
	        })
	        //WWJ添加工作日信息是否勾选判断
	        if(workingDay == ""){
	        	top.layer.msg(top.languageInit.allLanguage.selectWeekdayInfo);
	        	return;
	        }
	        //var calendarjson ={ "effectiveDate": "2019-03-07",  "expiryDate": "2019-03-30", "workingDay": "2_3"}
	        var calendarjson ={
	            effectiveDate:effectiveDate,
	            expiryDate:expiryDate,
	            workingDay:workingDay
	        }
	        $.ajax({
	            type: 'post',
	            url: calendarInitUrl,
	            contentType: 'application/text; charset=utf-8',
	            async: false,
	            data: JSON.stringify(calendarjson),
	            success: function (result) {
	                if(typeof result == "string"){
	                	result = JSON.parse(result);
	                }
	                var tr1 = custabcons1.find("table tbody tr");
	                tr1.not(":first-child").remove();
	                tr1.eq(0).find("input").val("");
	                var length2 = result.length;
	                $.each(result,function(i,e){
	                    if(i>0){
	                        custabcons1.find(".addrow").click();
	                        tr1 = custabcons1.find("table tbody tr");
	                    }
	                    var arr1 = Object.keys(e);
	                    $.each(arr1,function(ii,ee){
	                        tr1.eq(i).find('[name$="'+ee+'"]').val(e[ee]);
	                    })

	                })
	            },
	       
	        });
	    })
	}
}

//srcurl srcsrc 参数前面
function srcurl(){
	var srcurl1 = parent.$("iframe:visible").attr("src").split(".html")[0];
	var srcurl2 = srcurl1.substring(0, srcurl1.lastIndexOf("/") + 1);
	return srcurl2;
}

//类似审核页面全部readonly disabled
function iframeReadonly(){
	$("input:not(':checkbox')").attr("readonly","readonly");
	$("input:not(':checkbox')").attr("disabled","disabled");
	$("select").attr("disabled","disabled");
	$(".back").addClass("divDisabled");
	$(".datepicker, .ui-datepicker-trigger").addClass("divDisabled");
	$("button:not('.auditform','.copyform','.allopebtn')").attr("disabled","disabled");
	//$("#addeditbaseProcessRoute").removeAttr("disabled");
}

//查找带回bom版本，触发下面的生产数量计算
function BomRevBackQuantity(obj){
	var productionQuantityV = obj.val();
	var num1 = (obj.attr("name").split("]")[0]).split("[")[1];
	//<div class="addcopydel" name="[0]">
	var addcopydel1 = top.$("#admin-body iframe:visible").contents().find('.custabcons[tab="'+top.languageInit.allLanguage.productionMaterialUse+'"] .addcopydel[name="['+num1+']"]' );
	var tr1 = addcopydel1.find("table tbody tr");
	tr1.each(function(tr1i,tr1e){
		//需求数量是readonly
		var dRequiedQuantity = $(tr1e).find('.requiredQuantity');
		var notPickingQuantity = $(tr1e).find('.notPickingQuantity');
		
		var dQuantitiesMoleculeV = $(tr1e).find('.numerator').val()!="" ? $(tr1e).find('.numerator').val() : 0;
		var dQuantitiesDenominatorV = $(tr1e).find('.denominator').val()!="" ? $(tr1e).find('.denominator').val() : 1;
		var dInvariableLossV = $(tr1e).find('.fixedLoss').val()!="" ? $(tr1e).find('.fixedLoss').val() : 0;
		var dInvariableLossPercV = $(tr1e).find('.variableLossRate').val()!="" ? $(tr1e).find('.variableLossRate').val() : 0;
		
		var dUnitV = $(tr1e).find('[name$="dUnit"]').val()!="" ? $(tr1e).find('[name$="dUnit"]').val() : 0;
		//获取localStorage精度
		var precision=unitPrecision(dUnitV);
		
		//赋值
		var dRequiedQuantityV = ((dQuantitiesMoleculeV/dQuantitiesDenominatorV)*productionQuantityV+parseFloat(dInvariableLossV))*(1+parseFloat(dInvariableLossPercV/100));
		dRequiedQuantity.val(dRequiedQuantityV.toFixed(precision));
		dRequiedQuantity.attr("value",dRequiedQuantityV.toFixed(precision));
		notPickingQuantity.attr("value",dRequiedQuantityV.toFixed(precision));
	})
}

//生产用料清单计算
function quantity(){
////需求数量dRequiedQuantity=（（分子dQuantitiesMolecule/分母dQuantitiesDenominator）*生产数量productionQuantity+固定损耗dInvariableLoss）*（1+变动损耗率dInvariableLossPerc）
////未领数量=需求数量-领料数量
////领料数量=需求数量-未领数量
	//生产数量与其它数值是一对多关系
		//var productionQuantity = $('[name$="productionQuantity"]');
	//需求数量是readonly
		//var dRequiedQuantity = $('[name$="dRequiedQuantity"]');
		//var dQuantitiesMolecule = $('[name$="dQuantitiesMolecule"]');
		//var dQuantitiesDenominator = $('[name$="dQuantitiesDenominator"]');
		//var dInvariableLoss = $('[name$="dInvariableLoss"]');
		//var dInvariableLossPerc = $('[name$="dInvariableLossPerc"]');
	$('.productionQuantity').keyup(function () {
		var obj = $(this);
		BomRevBackQuantity(obj);
		
	})
	$(document).on('keyup', '.numerator, .denominator, .fixedLoss, .variableLossRate', function () {
		var thisV = $(this).val();
		var num1 = ($(this).closest(".addcopydel").attr("name").split("]")[0]).split("[")[1];
		var productionQuantityV = $('.custabcons[tab="'+top.languageInit.allLanguage.detailInfo+'"] .addcopydel table tbody tr').eq(num1).find(".productionQuantity").val();
		
		var thistr = $(this).closest("tr");
		//需求数量是readonly
		var dRequiedQuantity = thistr.find('.requiredQuantity');
		
		var dQuantitiesMoleculeV = thistr.find('.numerator').val()!="" ? thistr.find('.numerator').val() : 0;
		var dQuantitiesDenominatorV = thistr.find('.denominator').val()!="" ? thistr.find('.denominator').val() : 1;
		var dInvariableLossV = thistr.find('.fixedLoss').val()!="" ? thistr.find('.fixedLoss').val() : 0;
		var dInvariableLossPercV = thistr.find('.variableLossRate').val()!="" ? thistr.find('.variableLossRate').val() : 0;
		//单位
		var dUnitV = thistr.find('[name$=".unit"]').val()!="" ? thistr.find('[name$=".unit"]').val() : 0;
		if(dUnitV == undefined){
			var dUnitV = thistr.find('[name$=".dUnit"]').val()!="" ? thistr.find('[name$=".dUnit"]').val() : 0;
		}
		
		//赋值
		var dRequiedQuantityV = ((dQuantitiesMoleculeV/dQuantitiesDenominatorV)*productionQuantityV+parseFloat(dInvariableLossV))*(1+parseFloat(dInvariableLossPercV/100));
		
		//获取localStorage精度
		var precision=unitPrecision(dUnitV);
		
		dRequiedQuantity.val(dRequiedQuantityV.toFixed(precision));
		//领料数量dPickedQuantity   pickingCount
		//未领数量dUnPickedQuantity   notPickingCount
		var dPickedQuantityV = thistr.find('[name$="dPickedQuantity"]').val() != undefined ? thistr.find('[name$="dPickedQuantity"]').val() : thistr.find('[name$="pickingCount"]').val();
		if(dPickedQuantityV != ''){
			var dUnPickedQuantity = thistr.find('[name$="dUnPickedQuantity"]').length !=0 ? thistr.find('[name$="dUnPickedQuantity"]') : thistr.find('[name$="notPickingCount"]');
			dUnPickedQuantity.val(dRequiedQuantityV.toFixed(precision) - dPickedQuantityV);
		}
				
	
	})
	
}

//backClick
function backClick(){
	$(document).on('click', '.back', function () {
		
		//监控方案
		if(top.$("#admin-body iframe:visible").attr("src").indexOf('MonitorSolution')!=-1){
			if($('[name$="monitorSystem"]').val() == "device"){
	  			$("#monitorObjectName").attr("backkey","monitorDev").attr("serverName","baseData");
	  		}else{
	  			$("#monitorObjectName").attr("backkey","monitorObject").attr("serverName","backend");
	  		}
		}  			
		
		var dom = $(this);
		var titleStr = "";
		if(dom.hasClass('fa-search')){
			
			if(dom.parent('.layui-input-inline').length){
				dom = dom.parent('.layui-input-inline').find('input');
				
				titleStr = dom.parent('.layui-input-inline').siblings(".layui-form-label").text().replace(':','');
			}
			else{
				
				dom = dom.parent('td').find('input');
				var index =dom.parent('td').index();
				titleStr = dom.parents(".addedit").find("tr:eq(0)").find("th:eq("+index+")").text();			
			}
		}
		if(dom.parent('.layui-input-inline').length){
		    var thisTr = dom.closest(".custabcons.select").find(".layui-input");
		}else{
			var thisTr = dom.closest("tr");
		}
		
		//区分input点击     和     button点击
		
		if(dom.is("input")){
			var page = "back.html";
			var title = titleStr;
		}
		else if(dom.is("button")){
			var page = "select.html";
			var title = top.languageInit.allLanguage.chooseOrder;
		}
    	var serverName = dom.attr('servername');
    	
    	var backParmStr="";
    	//选单没有name
    	if(dom.attr("name")!= undefined){
    		//isBackNeedParam start
    		var flag = isBackNeedParam(dom);
    		if( flag === false ){
    			return false
    		}
    		else{
    			backParmStr = flag;
    		}
    	    //isBackNeedParam end
    	}
    	else{
    		function selectParmStrFun(){
    			$(".selectParm li").each(function(i,e){
    				var selectParmKey = $(e).text();
    				var selectParmVal = $('[name$='+selectParmKey+']').val();
    				if(i==0){
    					backParmStr = backParmStr+"?"+selectParmKey+"="+selectParmVal;
    				}
    				else{
    					backParmStr = backParmStr+"&"+selectParmKey+"="+selectParmVal;
    				}
    				
    			})
    		}
    		//选单带参数
    		if($(".selectParm").length>0){
    			selectParmStrFun();
            }
    	}
    	
        var backkey = dom.attr("backkey");

        var srcsrc = parent.$("iframe:visible").attr("src").split(".html")[0];
        if (srcsrc.indexOf("/") == -1) {
            var srcsrc = parent.parent.$("iframe:visible").attr("src");
        }
        
        var srcsrcsrc = srcsrc.substring(0, srcsrc.lastIndexOf("/") + 1);

        //为了区分jsplumb中的表格
        //为了区分列表查询页面表格
        if (dom.closest("td").length > 0 && dom.closest(".jsplumbjsplumb").length == 0 && dom.closest(".data").length == 0) {
        	//backPivotal(name)
        	var name = dom.closest("td").find("input").attr("name");
        	if(dom.closest("td").find("i").hasClass("backPivotal")){
        		var tip = "tablebackPivotal_" + dom.closest("tr").index() + "";
        	}else{
        		var tip = "tableback_" + dom.closest("tr").index() + "";
        	}
        	
        	
        }else {
        	//不加时间戳的话，相同id会打不开back页面
            var tip = "divback"+new Date().getTime() //非表格的查找带回
        }
         
        var backUrl = "";
        if(backkey != undefined){
        	
        	{
        		var html_name = $(window.parent.document).find('iframe:visible').attr('src');
        		
	        	var baseurl = 'pages/general/common/';
	        	var isCommon = true;
	        	srcsrcsrc = srcsrcsrc.indexOf('common')>0?(html_name.match(/src.+/)[0]).match(/pages.+/)[0]:srcsrcsrc;
	        	localStorage.setItem("srcs", srcsrcsrc);
	        	
        	}
        	
//        	if(html_name.indexOf('/production/productionWorkOrder') > 0||
//        	   html_name.indexOf('/quality/qualityInspectionPlan') > 0||
//        		html_name.indexOf('/basic_manage/monitor') > 0||
//        		html_name.indexOf('plant/productionOutSource/') > 0||
//        		html_name.indexOf('quality/qualityCheck')>0
//        		){
//        		isCommon = false;
//        	}
        	$.each(backSpecial,function(backSpecialI,backSpecialE){
        		if( html_name.indexOf(backSpecialE)>0 ){
        			isCommon = false;
        			//跳出each
        			return false
        		}
        	})
        	
        	if(backParmStr == ""){
        		backUrl = isCommon?(baseurl+page +'?' + backkey):(srcsrcsrc + page+'?' + backkey);  
        	}
        	else{
            	backUrl = isCommon?(baseurl+page+'?backKey=' + backkey + backParmStr):(srcsrcsrc + page+'?backKey=' + backkey + backParmStr);
            }
        	
        }
        //选单
        else if(backkey==undefined){
        	if(backParmStr == ""){
        		backUrl = srcsrcsrc + page
        	}
        	else{
        		backUrl = srcsrcsrc + page + backParmStr
        	}
        	
        }	
        localStorage.setItem("serverName", serverName);
        top.layer.open({
            id: tip,
            type: 2,
            title: title||findBack,
            area: ['800px', '540px'],
            maxmin: true,
            content: backUrl//iframe的url
            ,restore: function(layero){
            	var dom = layero.find("iframe").contents();
        		var gbox_backlist = dom.find('#gbox_backlist');
        		gbox_backlist.removeClass('width97');
        		
        		var backlist = dom.find("#backlist");
        		var backpager = dom.find("#backpager");
        		$(backpager).removeClass('width100');
        		$(backlist).setGridWidth(764, false);
            },
        	full: function(layero){
        		var dom = layero.find("iframe").contents();
        		var gbox_backlist = dom.find('#gbox_backlist');
        		gbox_backlist.addClass('width97');
        		
        		var backlist = dom.find("#backlist");
        		var backpager = dom.find("#backpager");
        		var width = gbox_backlist.css('width').replace("px","");
        		
        		$(backpager).addClass('width100');
        		$(backlist).setGridWidth(width, false);
        	},
        	min: function(layero){
        		console.log("---------ddddddddd---------");
        		
        	}
            , btn: [top.languageInit.allLanguage.sure]
            , yes: function (index, layero) {
            	layero.find("iframe").contents().find(".backinfo").click();
            	//监控对象
            	
            	if(dom.attr("name")=="monitorObjectName"){
            		$("#searchmodfbox_list").remove();
            		$(".monitoringCondition").append(`<table id="list"></table>`);
        			var monitorObjectVal = top.$("#admin-body iframe:visible").contents().find("[name='monitorObject']").val();
        			var monitorSystemVal = top.$("#admin-body iframe:visible").contents().find("[name='monitorSystem']").val();
        			if(!monitorObjectVal){
        				 top.layer.alert(top.languageInit.allLanguage.monitorCantBeEmpty,{
				    		btn: [top.languageInit.allLanguage.sure],
				        	title: top.languageInit.allLanguage.info
				        });
        				 return false;
        			}
        			//当监控对象为保修单和维修单时，需要根据monitorObjectVal得到正确的pagekey
        			//维修单：MesDeviceServices maintain_order
        			//报修单：MesDeviceRepairs repair_order
        			switch(monitorObjectVal){
        				case "maintain_order" :
        					monitorObjectVal = "MesDeviceServices";
        					top.$("#admin-body iframe:visible").contents().find("[name='monitorObject']").val(monitorObjectVal);
        					break;
        				case "repair_order":
        					monitorObjectVal = "MesDeviceRepairs";
        					top.$("#admin-body iframe:visible").contents().find("[name='monitorObject']").val(monitorObjectVal);
        				default:
        					monitorObjectVal = monitorObjectVal;
        				top.$("#admin-body iframe:visible").contents().find("[name='monitorObject']").val(monitorObjectVal);
        			}
        			var url =  testDomainName +'/api-b/dataCenterMonitorSetting/getPropertyByTable/'+monitorObjectVal+'/'+monitorSystemVal;
            		pageInit(url);
            		$("#gbox_list").remove();
            		$("#alertmod_list").remove();
            		$("#searchmodfbox_list").css("position","static");
            		$(".EditTable").remove();
            	
        		}
            	top.layer.close(index); //如果设定了yes回调，需进行手工关闭
            }
            , btn2: function (index, layero) {
                top.layer.close(index); //如果设定了yes回调，需进行手工关闭
            }
        });

    })
}

function backinfoClick(tableback,tablebackList,searchbackListUrl){
	
	var table1 = $("#backlist");
	if(parent.$("[id^=tablebackPivotal]").length > 0){
		var selectedId = table1.jqGrid("getGridParam", "selarrrow");
    }else{
    	var selectedId = table1.jqGrid("getGridParam", "selrow");
    }
    
//    if(!selectedId) {
// 	   top.layer.alert('请选中一条数据！')
//        return false
//    }
	//选单没有 tableback
	if(tableback!=undefined){
        var backinfo1 = [];
        var backinput1 = [];
        //组合backInfo为数组和backinput为数组
        for (var i = 0; i < tableback.length; i++) {
            backinfo1.push(tableback[i].backInfo);
            backinput1.push(tableback[i].input);
        }
        
        
        
        if(parent.$("[id^=tablebackPivotal]").length > 0){
        	var num1 = parseInt(parent.$("[id^=tableback]").attr("id").split("_")[1]);
            var tbody1 = top.$("#admin-body iframe:visible").contents().find("tbody");
        	var jsonArr = [];
        	$.each(selectedId,function(selectedIdI,selectedIdE){
        		var jsonArrJson = {};
        		$.each(backinfo1, function (i, e) {
        			var value1 = table1.jqGrid("getRowData", selectedIdE)["" + e + ""];
        			jsonArrJson[backinput1[i]] = value1;
        		})
        		jsonArr.push(jsonArrJson);
            })
            
                //选中的那个查找框
        		var inputName = backinput1[0].split(".")[1];
        		var tab = tbody1.find('[name$='+inputName+']').closest(".custabcons");
        		var tbody = tab.find("table tbody");
        		
        		var rowArr = [];
        		rowArr.push(num1);
        		//对比空行和jsonArr长度，不够就新增行
        		var trLength = 1;
        		tbody.find("tr").each(function(trI,trE){
        			if($(trE).find('[name$='+inputName+']').val()=="" && trI !=num1){
        				trLength++;
        			}
        		})
        		if(trLength <= jsonArr.length){
        			var length = Number(jsonArr.length) - trLength;
        			for(var i=0; i<=length;i++){
        				tab.find(".addrow").click();
        			}
        		}
        		//找出查找带回行下面的行有哪些行是空行
        		tbody.find("tr").each(function(trI,trE){
        			//因为上面多新增了一行，多以这边要根据jsonArr的长度，确定rowArr的长度
        			if(trI > num1 && rowArr.length < jsonArr.length){
        				if($(trE).find('[name$='+inputName+']').val()==""){
        					rowArr.push(trI);
        				}
        			}
        		})
        		
        }else{
        	//var json1 = {};
            var json2 = {};
            $.each(backinfo1, function (i, e) {
                var value1 = table1.jqGrid("getRowData", selectedId)["" + e + ""];
                //console.log(JSON.stringify(table1.jqGrid("getRowData", selectedId)));
                //json1[e] = value1;
                json2[backinput1[i]] = value1;
            })
            //console.log(json1);
            console.log(json2);
        }
        
        $.each(backinput1, function (i, e) {
        	
        	
        	var el = e.split(".")[0];
            var er = e.split(".")[1];
          //.layui-layer-iframe:last判断最后一个弹窗是行里的行是非行里的
        	if(parent.$(".layui-layer-iframe:last").find("[id^=tablebackPivotal]").length > 0) {
        		var num1 = parseInt(parent.$("[id^=tableback]").attr("id").split("_")[1]);
                var tbody1 = top.$("#admin-body iframe:visible").contents().find("tbody");
            	//tablebackPivotal查找带回多条，查找带回新增行
            	//拼接result     editspe('',result) 和选单一样 走 值渲染的方法
            	//和选单不一样的地方就是，选单的值渲染挨个往下渲染，但是多条查找带回，不一定是挨个往下渲染
            	//jsonArr
        		var count = 0;
        		$.each(rowArr,function(rowArrI,rowArrE){
        			var elr = el + "[" + rowArrE + "]." + er;
        			
        			//是否启用批号，启用批号但是没有批号编码规则就手输批号，input change验证
        			batchNumberAble(e,jsonArr,count,tbody1,rowArrE);
        			//质检方案 检验项目查找带回（定性 / 定量）
                	Inspection2(e,jsonArr,count,tbody1,rowArrE);
                	
                    tbody1.find("[name$='" + elr + "']").val(jsonArr[count][e]);
                    var selectObj=tbody1.find("[name$='" + elr + "']");
                    var selectText=jsonArr[count][e];
                	selectTextVal(selectObj,selectText);
                    count++;
                    
                    tbody1.find("[name$='" + elr + "']").focus();
                    //tbody1.find("[name$='" + elr + "']").blur();
        		})
        		
        		
        		
            //.layui-layer-iframe:last判断最后一个弹窗是行里的行是非行里的
            }else if (parent.$(".layui-layer-iframe:last").find("[id^=tableback]").length > 0 && parent.$(".layui-layer-iframe:last").find("[id^=tablebackPivotal]").length == 0) {
        		//排除tablebackPivotal
            	//对应行name
            	var num1 = parseInt(parent.$("[id^=tableback]").attr("id").split("_")[1]);
                var tbody1 = top.$("#admin-body iframe:visible").contents().find("tbody");
                var elr = el + "[" + num1 + "]." + er;
                tbody1.find("[name$='" + elr + "']").val(json2[e]);
                 ////查找带回，带回text，对应val
                var selectObj=tbody1.find("[name$='" + elr + "']");
                var selectText= json2[e];
            	selectTextVal(selectObj,selectText);
            	
            	// 编码规则新增页面      格式CodeRuleDetail[1].format查找带回     赋值长度CodeRuleDetail[0].length
            	formatLength(e,num1,json2);
            	
            	//物料新增 换算单位查找带回     基本单位和换算单位一样时，基本数量和换算数量 只读 默认1:1
            	sameUnit(e,num1,json2);
            	
            	tbody1.find("[name$='" + elr + "']").focus();
            	//tbody1.find("[name$='" + elr + "']").blur();
            	
            }else if (parent.$(".layui-layer-iframe:last").find("[id^=divback]").length > 0 || 
            		parent.$(".layui-layer-iframe:first").find("[id^=jsPlumb]").length > 0) {              
                //treeSearch.html页面，搜索的查找带回，需要iframe里面的iframe；
                if( (top.$("#admin-body iframe:visible").attr("src").indexOf("/treeSearch.html")!=-1 
                		|| top.$("#admin-body iframe:visible").attr("src").indexOf("/treesearch.html")!=-1) && 
                		parent.$(".layui-layer-iframe").length==1 ){
                	
                	var selectObj=top.$("#admin-body iframe:visible").contents().find("iframe").contents().find("[name='" + e + "']");
                	var selectText = json2[e];
                	
                	////查找带回，带回text，对应val
                	selectTextVal(selectObj,selectText);
                	top.$("#admin-body iframe:visible").contents().find("iframe").contents().find("[name='" + e + "']:not('select')").val(json2[e]);
                	
                }else if( (top.$("#admin-body iframe:visible").contents().find("[name$='" + e + "']").length>0 && 
                			parent.$(".layui-layer-iframe").length==1) || 
                		  (parent.$('.layui-layer-iframe').eq(parent.$('.layui-layer-iframe').length-2).find("iframe").contents().find("[name='" + e + "']").length>0 && 
                			parent.$(".layui-layer-iframe").length>1)){
                	//search和表单页面非行 查找带回
                	var selectObj=top.$("#admin-body iframe:visible").contents().find("[name$='" + e + "']").length>0 ? 
                					top.$("#admin-body iframe:visible").contents().find("[name$='" + e + "']") : 
                					parent.$('.layui-layer-iframe').eq(parent.$('.layui-layer-iframe').length-2).find("iframe").contents().find("[name='" + e + "']");
                	var selectText = json2[e];
                	////查找带回，带回text，对应val
                	selectObj.val(json2[e]).change();
                	selectTextVal(selectObj,selectText);
                	
                	//选择地区清空值
                	clearAddress(e,json2);
                	
                	//bug 2986 修改焦点事件
                	selectObj.focus();
                	selectObj.blur();
                	selectObj.change();
                	
                    console.log(json2[e]);
                	

                
                }else if( parent.$(".layui-layer-iframe:last").find("[id^=tableback]").length == 0 &&  
                			parent.$(".layui-layer-iframe:last").find("[id^=divback]").length == 0 ){
                	//弹窗上查找带回
                	//以.分，看能分成几个     suffix后缀
                	var suffix = "";
                	if(e.split(".").length==2){
                		suffix=e.split(".")[1];
                	}
                	else if(e.split(".").length=en =3){
                		suffix=e.split(".")[2];
                	}
                	
                	var iframeObj = top.$(".layui-layer").eq(0).find("iframe").contents();
                	var formObj = iframeObj.find("form:visible");
                	
                	//把工序名称带回给节点
                	if(suffix=="poName"){
                		var formId = formObj.attr("id");
                		//drawingContentNodes1561178126801
                		iframeObj.find("#drawingContentNodes"+formId).find("span").eq(0).text(json2[e]);
                	}
                	
                	var inputObj = formObj.find("input[name$='" + suffix + "']");
                	inputObj.val(json2[e]);
                	
                	var selectObj=formObj.find("select[name$='" + suffix + "']");
                	var selectText = json2[e];
                	
                	////查找带回，带回text，对应val
                	selectTextVal(selectObj,selectText);
                }
                
                //物料 选择单位，要不要显示换算表格
                scaleTable(i,e,json2,backinput1);
            }

        	
        })
	}
    
	
    ////backlist
    if(tablebackList != undefined){
    	var backList = tablebackList;
        var backListJson = {};
        $.each(backList,function(backListi,backListe){
        	if(backListe.indexOf(".")!=-1){
        		var value1 = table1.jqGrid("getRowData", selectedId)["" + backListe + ""];
            	backListJson[backListe] = value1;
        	}
        	else{
        		var value1 =  top.$("#admin-body iframe:visible").contents().find('[name$="'+ backListe +'"]').val();
        		backListJson[backListe] = value1;
        	}
        })
        
        if(tableback==undefined){
        	var backListJsonArr = [];
            backListJsonArr.push(backListJson);
        	
        }else{
        	var backListJsonArr = backListJson;
        }
        $.ajax({
        	type: 'post',
        	url: searchbackListUrl,
        	contentType: "application/text; charset=utf-8",
        	async: false,
        	data: JSON.stringify(backListJsonArr),
        	success: function (result) {
        		
        		console.log(result);
        		if(typeof result == "string"){
                	result = JSON.parse(result);
                }
        		
        		//区分物料那边带单位的比例
        		scaleJson(result,backinput1);
        		
        		
        		//区分选单和
        		///带回list
        		if(parent.$("[id^=tableback]").attr("id")!=undefined){
        			var num1 = parseInt(parent.$("[id^=tableback]").attr("id").split("_")[1]);
            		
            		var iframeC = top.$("#admin-body iframe:visible").contents();
            		var addcopydel = iframeC.find('.custabcons[tab="'+top.languageInit.allLanguage.productionMaterialUse+'"]').length > iframeC.find('.custabcons[tab="'+top.languageInit.allLanguage.checkInfo+'"]').length ? iframeC.find('.custabcons[tab="'+top.languageInit.allLanguage.productionMaterialUse+'"] .addcopydel[name="['+num1+']"]') : iframeC.find('.custabcons[tab="'+top.languageInit.allLanguage.checkInfo+'"] .addcopydel[name="['+num1+']"]')              
            		
            		addcopydel.find("table tbody tr:not(:first-child)").remove();
            		//清空第一条数据
            		addcopydel.find("table tbody tr:first-child input:not([name$='lineNo'])").val("");
            		
            		for(var backvaluei=1;backvaluei<result.length;backvaluei++){
            			addcopydel.find(".addrow").click();
                	}
            		$.each(result,function(resulti,resulte){
            			
            			//resulte即每一条json
            			var resultekeys = Object.keys(resulte);
            			//resultekeyse即每一条json的key值
            			$.each(resultekeys,function(resultekeysi,resultekeyse){
            				var namel = resultekeyse.split(".")[0];
            				var namer = resultekeyse.split(".")[1];
            				var name = namel+"["+resulti+"]."+namer;
            				addcopydel.find('[name$="'+name+'"]').val(resulte[resultekeyse]);
            				addcopydel.find('[name$="'+name+'"]').attr("value",resulte[resultekeyse]);
            			})
            		})
        		}
        		//选单带回
        		else {
        			editspe('',result)
        		}
        		
        		
        		
        	},
        	error:function(){
        		
        	}
        });
        
    }
    if(typeof(fn) == "function" ){
    	fn(top.$("#admin-body iframe:visible").contents());
    }
    
    //如果backkey是bom，也就是点击的文本框是bom版本，需要触发生产数量的计算  productionQuantity
    //抽样方案QcCheckDeatil[0].QcCheckInfo[0].samplingPlanbackkey == "qualitySamplingPlan"
    var iframeObj = top.$(".layui-layer-content").find("iframe").attr("src");
    if(iframeObj.indexOf("back.html")!=-1){
    	
    	if(iframeObj.indexOf("backKey")!=-1){
    		var backkey = (iframeObj.split("backKey=")[1]).split("&")[0];
    	}else{
    		var backkey = iframeObj.split("back.html?")[1];
    	}
    	
        if(backkey == "bom"){
        	//detail1
        	////因为bom版本会带回list，所以只能写在下面
        	var num1 = top.$(".layui-layer-content").attr("id").split("tableback_")[1];
        	var productionQuantityObjName = tableback[0].input.split(".")[0] + "[" + num1 + "]." + tableback[0].input.split(".")[1];
        	var productionQuantityObj = top.$("#admin-body iframe:visible").contents().find('[name="'+productionQuantityObjName+'"]').closest("tr").find('[name$="productionQuantity"]');
        	BomRevBackQuantity(productionQuantityObj)
        }else if(backkey == "inspectionPlan"){
        	//detail3
        	//应该可以写在上面，先不动
        	var num1 = top.$(".layui-layer-content").attr("id").split("tableback_")[1];
        	var obj1 = top.$("#admin-body iframe:visible").contents().find('.custabcons[tab="'+top.languageInit.allLanguage.detailInfo+'"] table tbody tr').eq(num1).find('[name$="checkNum"]');
        	var who = "back";
        	samplingScheme(obj1,who);
        }
    }
}

//地区
function clearAddress(e,json2){
	if( e.endsWith('.country') ){
		top.$("#admin-body iframe:visible").contents().find('[name$="area"], [name$="areaId"], [name$="provinceId"], [name$="province"], [name$="cityId"], [name$="city"]').val('');
	}
	if( e.endsWith('.area') ){
		top.$("#admin-body iframe:visible").contents().find('[name$="provinceId"], [name$="province"], [name$="cityId"], [name$="city"]').val('');
	}
	if( e.endsWith('.province') ){
		top.$("#admin-body iframe:visible").contents().find('[name$="cityId"], [name$="city"]').val('');
	}
}

////其他入库单 :是否启用批号，启用批号但是没有批号编码规则就手输批号，input change验证
//其他出库单：没有启用批号，则禁用批号查找带回
function batchNumberAble(e,jsonArr,count,tbody1,rowArrE){
	if(e.indexOf('.isBatch')!=-1){
		
		if(jsonArr[count][e]==top.languageInit.allLanguage.yes && 
		   jsonArr[count]['ProductionOtherInOrderDetail.batchRuleId']=='' &&
		   e.indexOf('ProductionOtherInOrderDetail')!=-1){
			
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').attr('readonly',false);
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').next().removeClass('divDisabled');
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').closest('td').addClass('edit-inline');
		
		}else if(jsonArr[count][e]==top.languageInit.allLanguage.yes && 
				e.indexOf('ProductionOtherInOrderDetail')==-1){
			
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').attr('readonly',false);
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').next().removeClass('divDisabled');
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').closest('td').addClass('edit-inline');
		}else{
			
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').attr('readonly',true);
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').next().addClass('divDisabled');
			tbody1.find('[name$="['+rowArrE+'].batchNumber"]').closest('td').removeClass('edit-inline');
		}
	}
}

//区分物料那边带单位的比例
function scaleJson(result,backinput1){
	if( Array.isArray(result) &&
			JSON.stringify(result[0]).indexOf('transformType')!=-1 && 
			JSON.stringify(result[0]).indexOf('baseUnitNum')!=-1 && 
			JSON.stringify(result[0]).indexOf('baseUnit')!=-1 && 
			JSON.stringify(result[0]).indexOf('transformUnit')!=-1 && 
			JSON.stringify(result[0]).indexOf('transformUnitNum')!=-1 ){
			
			//选中的那个查找框
			var inputName = backinput1[0];
			var num = parseInt(parent.$("[id^=tableback]").attr("id").split("_")[1]);
			var inputNameNum = inputName.split('.')[0]+'['+num+'].'+inputName.split('.')[1];
			top.$('.layui-tab-content iframe:visible').contents().find('[name="'+inputNameNum+'"]').closest('tr').find('[name$="scale"]').val(JSON.stringify(result));
		}
}

//渲染页面时     物料 没有设置基本数量和换算数量 表格应该不显示
////BaseUnitTransform[0].baseUnitNum
////BaseUnitTransform[0].transformUnitNum
function  unitTable(){
	if( window.frameElement.src.indexOf('material')!=-1 && 
		  ( window.frameElement.src.indexOf('view')!=-1 || 
			window.frameElement.src.indexOf('copy')!=-1 || 
			window.frameElement.src.indexOf('edit')!=-1 || 
			window.frameElement.src.indexOf('audit')!=-1 )
	   ){
		var count = 0;
		$('.addcopydel table tbody tr').each(function(tri,tre){
			if( $(tre).find('[name$="baseUnitNum"]').val()!='' ||
		    $(tre).find('[name$="transformUnitNum"]').val()!='' ){
				
				count++;
			}
		})
		if(count!=0){
			$('.addcopydel').show();
		}else{
			$('.addcopydel').hide();
		}
}
}

//物料选择单位，要不要显示换算表格
function scaleTable(i,e,json2,backinput1){
	//物料新增
    ////选择单位，带回表格里面的基本单位
    if (e == "BaseUnitTransform.baseUnit") {
        top.$("#admin-body iframe").contents().find("input[name^='BaseUnitTransform']").filter("input[name$='baseUnit']").val(json2[e]);
    } 
    //基本单位 BMaterial.baseUnitName
	//库存单位 BMaterial.stockUnitName
	//库存辅单位 BMaterial.stockUnitSecName
	//生产单位 BMaterial.procutUnit
	////单位不一样出现表格
    ////因为backinput1里面有个BaseUnitTransform.baseUnit，除了这个都是非表格里面的，所以不能放在上面
	if( i == backinput1.length-1 && 
	   ( backinput1[0].indexOf("BMaterial.baseUnitName")!=-1 ||
		 backinput1[0].indexOf("BMaterial.stockUnitName")!=-1 ||
		 backinput1[0].indexOf("BMaterial.stockUnitSecName")!=-1 ||
		 backinput1[0].indexOf("BMaterial.procutUnit")!=-1 ) ){
		
		var baseUnitNameVal = top.$("#admin-body iframe:visible").contents().find('[name="BMaterial.baseUnitName"]').val();
		var stockUnitNameVal = top.$("#admin-body iframe:visible").contents().find('[name="BMaterial.stockUnitName"]').val();
		var stockUnitSecNameVal = top.$("#admin-body iframe:visible").contents().find('[name="BMaterial.stockUnitSecName"]').val();
		var procutUnitVal = top.$("#admin-body iframe:visible").contents().find('[name="BMaterial.procutUnit"]').val();
		
		var unitArr = [];
		//排除库存辅单位可能空值的情况
		if(stockUnitSecNameVal==''){
			unitArr.push(baseUnitNameVal,stockUnitNameVal,procutUnitVal);
		}else{
			unitArr.push(baseUnitNameVal,stockUnitNameVal,stockUnitSecNameVal,procutUnitVal);
		}
		var unitArrCount=0;
		$.each(unitArr,function(unitArrI,unitArrE){
			$.each(unitArr,function(unitArrIi,unitArrEe){
    			if(unitArrE != unitArrEe){
    				unitArrCount++
    			}
    		})
		})
		if(unitArrCount>0){
			top.$("#admin-body iframe:visible").contents().find('.addcopydel').show();
		}else{
			top.$("#admin-body iframe:visible").contents().find('.addcopydel').hide();
		}
		
	}
}

//物料选择单位，基本单位和换算单位一样，默认1:1
function sameUnit(e,num1,json2){
	if(e.indexOf("BaseUnitTransform")!=-1 && e.indexOf("transformUnit")!=-1){
		//基本数量 BaseUnitTransform[0].baseUnitNum   基本单位 BaseUnitTransform[0].baseUnit
		//换算数量 BaseUnitTransform[0].transformUnitNum   换算单位 BaseUnitTransform[0].transformUnit
		////基本单位 val
		var baseUnitVal = top.$("#admin-body iframe:visible").contents().find("[name$='["+num1+"].baseUnit']").filter('[name^="BaseUnitTransform"]').val();
		
		var baseUnitNum = top.$("#admin-body iframe:visible").contents().find("[name$='["+num1+"].baseUnitNum']").filter('[name^="BaseUnitTransform"]');
		var transformUnitNum = top.$("#admin-body iframe:visible").contents().find("[name$='["+num1+"].transformUnitNum']").filter('[name^="BaseUnitTransform"]');
		
		if(baseUnitVal == json2[e]){
			baseUnitNum.attr('readonly',true);
			baseUnitNum.val(1);
			transformUnitNum.attr('readonly',true);
			transformUnitNum.val(1);
		}else{
			baseUnitNum.attr('readonly',false);
			//baseUnitNum.val('');
			transformUnitNum.attr('readonly',false);
			//transformUnitNum.val('');
		}
	}
}

//编码规则新增页面      格式CodeRuleDetail[1].format查找带回     赋值长度CodeRuleDetail[0].length
function formatLength(e,num1,json2){
	if( (e.indexOf("CodeRuleDetail")!=-1 || e.indexOf("OtherCodeRuleDetail")!=-1)  && e.indexOf("format")!=-1){
		//var CodeRuleDetailLengthObj = top.$("#admin-body iframe:visible").contents().find("[name$='["+num1+"].length']").filter('[name^="CodeRuleDetail"]');
		var CodeRuleDetailLengthObj = top.$("#admin-body iframe:visible").contents().find("[name$='["+num1+"].length']");
		//时间格式长度赋值
		CodeRuleDetailLengthObj.val(json2[e].length);
	}
}


function setSize(){
	
	 $(".ui-jqgrid-htable").css("width", "auto");
       $(".ui-jqgrid-htable th").css("width", "");
       $(".ui-jqgrid-btable").css("width", "");
       $(".ui-jqgrid-btable td").css("width", "");
       
       var length1 = $(".ui-jqgrid-htable th").length;
       var array1 = [];
       for (i = 0; i < length1; i++) {
           var width1 = $(".ui-jqgrid-htable th").eq(i).width() + 31;//32是排序的icon宽度
           
           var length2 = $(".ui-jqgrid-btable tr").length;
           var width2 = 0;
           var width2 = width2 > $(".ui-jqgrid-btable tr").eq(0).find("td").eq(i).width() ? width2 : $(".ui-jqgrid-btable tr").eq(0).find("td").eq(i).width();
           
           var width0 = width1 > width2 ? width1 : width2;
           array1.push(width0);
       }

       var num0 = 0;
       $.each(array1, function (i, e) {
           $(".ui-jqgrid-htable th").eq(i).width(e);
           $(".ui-jqgrid-btable tr:first-child td").eq(i).width(e);
           //显示的th，不显示的不用计算宽度
           if( $(".ui-jqgrid-htable th").eq(i).is(':visible')  ){
        	   num0 += e;
           }
           
       })
       $(".ui-jqgrid-htable, .ui-jqgrid-btable").width(num0);
       $("#backlist").setGridWidth($("#gbox_list").width(), false);
}

//jqgrid 展开表格
function zkbg(){
	$(".zkbg").click(function () {
		setSize();
    })
    
    
}

//cusTab
function cusTab(){
	$(document).on('click', '.custabtits', function () {
        var detail1 = $(this).attr("tab");
        $(this).addClass("select").siblings().removeClass("select");
        $(".custabcons[tab='" + detail1 + "']").addClass("select").siblings().removeClass("select");
        $(".custabcons[tab='" + detail1 + "']").show().siblings().hide();
    })	
}



//detail1 obj2 detail3 checkbox 引用
function aedbtnsspe() {
	var objDetArr = pageObjDet();
	var objArr = objDetArr[0];
	var detArr = objDetArr[1];

	$.each(objArr,function(objArrI,objArrE){
		$(document).on('click', '.custabcons[tab="'+objArr[0]+'"] .aedbtns', function () {
	        var num1 = ($(this).attr("namename").split("[")[1]).split("]")[0];
	        var custabcons1 = $('.custabcons[tab="'+objArrE+'"]');
	        if ($(this).is(":checked")) {
	            $(this).closest("tr").siblings().find(".aedbtns").removeAttr("checked");
	            custabcons1.find('.layui-form-item').hide();
	            custabcons1.find('.layui-form-item[name="[' + num1 + ']"]').show();   
	        } 
	        else {
	            top.layer.alert(top.languageInit.allLanguage.mustChooseOne,{
		    		btn: [top.languageInit.allLanguage.sure],
		        	title: top.languageInit.allLanguage.info
				 });
	            return false
	        }
	    })
	})
	
	$.each(detArr,function(detArrI,detArrE){
		$(document).on('click', '.custabcons[tab="'+objArr[0]+'"] .aedbtns', function () {
			//启用sn号 sn号tab可以点击     不启用sn号 sn号tab不可以点击
			var isSn=$(this).closest("tr").find('[name$=isSn]').val();
			if(isSn=="0"){
				//$(".custabtits[tab='SN号']").addClass("divDisabled");
				$(".custabtits[tab='"+top.languageInit.allLanguage.sn+"']").addClass("none");
			}
			else{
				//$(".custabtits[tab='SN号']").removeClass("divDisabled");
				$(".custabtits[tab='"+top.languageInit.allLanguage.sn+"']").removeClass("none");
			}
			var 
			num1 = ($(this).attr("namename").split("[")[1]).split("]")[0];
			var custabcons2 = $('.custabcons[tab="'+detArrE+'"]');
			if ($(this).is(":checked")) {
				$(this).closest("tr").siblings().find(".aedbtns").removeAttr("checked");
				custabcons2.find('.addcopydel').hide();
				custabcons2.find('.addcopydel[name="[' + num1 + ']"]').show();
            
			} else {
				top.layer.alert(top.languageInit.allLanguage.mustChooseOne,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});

				return false
			}
			//isSn 启用sn、tab sn可以点击，不启用sn、tab sn不可以点击
			if(isSn=="true"){
				var isSn = $(this).closest("tr").find('[name$="isSn"]').val();
				$('.custabtits[tab="'+top.languageInit.allLanguage.sn+'"]').addClass("divDisabled");
			} 
			
		})
	})
	
	
}

//需要新增obj2和detail3对应的东西    新增行复制行中调用
function obj2detail3(btn,btnType,cloneIndex){
	//工序列表和明细信息不要国际化
    if(btn.closest('.custabcons[tab="工序列表"]').length!=0 || btn.closest('.custabcons[tab="明细信息"]').length!=0){
    	var objDetArr = pageObjDet();
    	if(objDetArr == false){
    		return false
    	}
    	var objArr = objDetArr[0];
    	var detArr = objDetArr[1];
    	   	
    	var num1 = btn.closest(".addcopydel").find("table tbody tr").index();
    	
    	//objArr
    	$.each(objArr,function(objArrI,objArrE){
    		if(objArrI != 0){
    			var custabcons1 = $('.custabcons[tab="'+objArrE+'"]');
        		var html1 = custabcons1.find('.layui-form-item[name="['+cloneIndex+']"]').html();
                var html2 = html1.replace(/\[(\d+)\]/g, "[" + num1 + "]");
                custabcons1.append('<div class="layui-form-item" style="display: none;" name="['+num1+']">' + html2 + '</div>');
                //新增行 清空值         复制行 保留值        新增 明细信息 产生执行信息时，需要清空执行信息的id
                var custabcons2 = $('.custabcons[tab="'+objArrE+'"] .layui-form-item:last');
                if(btnType=="addrow"){
            		custabcons2.find('input').val("");
            		custabcons2.find("tr:gt(0)").remove();
              	}else if(btnType=="copyrow"){
            		custabcons2.find('[name$=".id"]').val("");
            	}
    		}    		
    	})
    	//detArr
    	$.each(detArr,function(detArrI,detArrE){
        	var custabcons1 = $('.custabcons[tab="'+detArrE+'"]');
        	var html1 = custabcons1.find('.addcopydel').html();
        	var html2 = html1.replace(/ name=(\D+)(\d+)/g," name=$1"+num1);
        	custabcons1.append('<div class="addcopydel" style="display: none;" name="['+num1+']">' + html2 + '</div>');
        	//新增行 清空值     复制行     保留值
        	var custabcons2 = $('.custabcons[tab="'+detArrE+'"] .addcopydel:last');
        	if(btnType=="addrow"){
        		custabcons2.find("input").val("");
        		custabcons2.find("tr:gt(1)").remove();
        	}else if(btnType=="copyrow"){
        		custabcons2.find('[name$=".id"]').val("");
        	}
    	})

    }
}

//新增行后与前面的明细信息里面的实领数量做对比，不能大于前面的实领数量
 function comparisonQantity(smallValue,largeValue){
	 $(document).on('change', '[name$="'+smallValue+'"]', function () {
		 var smallValueV = Number($(this).val());
		 var largeValueV = Number($(this).closest("tr").find('[name$="'+largeValue+'"]').val());
		 if(smallValueV > largeValueV){
			top.layer.alert(top.languageInit.allLanguage.cannotGreaterThanApplyNum,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

			 $(this).val(0).keyup();
			 return false
		 }
	 })
 }


//保存的时候对比sn的行数等于实领数量
//扫描SN号新增一行
function SNAdd(SNAddUrl,comparison){
	//$('#SNno').keyup(function(event){
	$(document).on('keyup', '#SNno', function () {	
		if(event.keyCode=='13'){
			if(comparison!=undefined){
				//其他入库单：获取单据类型，如果为废品入库单，，此时扫仓库中的SN，则单据状态设置为不合格
				var billType = $('[name$="billType"]').val();
				if(billType == 0){//废品入库单
					comparison[2] = "0";//不合格
				}else if(billType == 1 ||billType ==2){
					//如果是废品入库单之外的单据，用户手输，只需要校验与数据库中不重复即可
					comparison[2] = "-1";//仅用于区分其他情况，无具体含义
				}else{
					//其他入库单之外的单据，都为合格的
					comparison[2] = "1";//合格
				}
				
				var nameE = comparison[0];
				var nameC = comparison[1];
				//根据单据类型，加入SN号合格状态的判断，放在comparison[2]中，除废品入库单之外，其他都为合格
				var qualityStatus = comparison[2];
			}
			var thisI  = $(this);
			var thisVal = $(this).val();
			var type = $(this).attr("snType");
			var checkSn = null;
			var nameNum = $(this).closest(".addcopydel").attr("name");
			//批号 batchNumber			
			var batchNumber = $('[name$="'+nameNum+'.batchNumber"]').val();
			console.log("batchNumber:"+batchNumber);
			
			var flowNo = $('[name$="PlantProductionExecution.flowNo"]').val();
			//实领数量actualCount
			////扫描sn的时候，1.需要与 实领数量 做对比，2.如果 实领数量为0，则不允许扫描
//			var val1 = $('[name$="'+nameNum+'.'+nameE+'"]').val();
//			var snNo1 = thisI.closest(".addcopydel").find('table tbody tr:first-child [name$="snNo"]').val();
//			var snL = thisI.closest(".addcopydel").find('table tbody tr').length;
//			if(val1==""){
//				layer.msg('请先输入'+nameC+'！', {
//					  icon: 7,
//					  time: 1500
//				})
//				return false
//			}
//			else if(val1==snL){
//				if(snNo1!=""){
//					layer.msg('扫描数量不能大于'+nameC+'！', {
//						  icon: 7,
//						  time: 1500
//					})
//					return false
//				}
//				
//			}
			
			//根据是否有批号，拼接需要校验的字段
			if(batchNumber == ""){
				checkSn = {
					type:type,
					snNo:thisVal,
					qualityStatus:qualityStatus,
					flowNo:flowNo
			}
			} else {
				checkSn = {
					type:type,
					snNo:thisVal,
					qualityStatus:qualityStatus,
					batchNumber:batchNumber,
					flowNo:flowNo
			}
			}
			var flag = true;
			thisI.closest(".custabcons").find('table tbody tr').each(function(){
				if($(this).find('input[name$="snNo"]').val()==thisVal){//原本为SNNo,修改为snNo
					var index = $(this).closest(".addcopydel").index();
					var msg = top.languageInit.allLanguage.snAndDetail+(index+1)+top.languageInit.allLanguage.snRepeat;
					layer.msg(msg, {
						  icon: 7,
						  time: 3000 
						})
					flag = false;
				}
			})

			//thisVal = thisVal +"&"+batchNumber;
			if(flag){
				$.ajax({
					 url: SNAddUrl,
			         type: 'post',
			         contentType: 'application/text; charset=utf-8',
			         async: false,
			         data: JSON.stringify(checkSn),
			         success: function (result) {
			        	 if(typeof result == "string"){
			                	result = JSON.parse(result);
			             }
		                 if (result.header.status == '200') {
			    		 	if(thisI.closest(".addcopydel").find("table tbody tr:last-child").find('[name$="snNo"]').val()!=""){
			    		 		thisI.closest(".addcopydel").find(".addrow").click();
			    		 	}
			    		 	thisI.closest(".addcopydel").find("table tbody tr:last-child").find('[name$="snNo"]').val(thisVal);
			    		 	thisI.closest(".addcopydel").find("table tbody tr:last-child").find('[name$="snNo"]').attr("value",thisVal);
			             }
		                 else{
		                	 alert(result.header.statusContent);
		                 }
			         }
				})
			}
			
			
			
		}
	})
}

//扫描SN号 自检变为不合格
function SNUnqualified(){
  //$('#SNUnqualified').keyup(function(event){
	$(document).on('keyup', '#SNUnqualified', function () {	
		if(event.keyCode=='13'){
			var thisI  = $(this);
			var thisVal = $(this).val();
			
			var count=0;
			thisI.closest(".addcopydel").find('table tbody tr').each(function(trI,trE){
				if($(this).find('input[name$="snNo"]').val()==thisVal){//原本为SNNo,修改为snNo
					//自检结果selfCheckResult 0合格 1不合格
					$(this).find('select[name$="selfCheckResult"]').val(1);
					$(".divOverflow").scrollTop(0);
					var offsetTop1 = $(this).offset().top;
					var offsetTop2 = $(".divOverflow").offset().top;
				    $(".divOverflow").scrollTop(offsetTop1-offsetTop2);
				    var obj = thisI;
				    QualifiedNum(obj);
					return false
				}
				else{
					count++;
				}
			})
			
			if(count==thisI.closest(".addcopydel").find('table tbody tr').length){
				top.layer.alert(top.languageInit.allLanguage.snNotExist,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});

				return false
			}
		}
	})
}

//合格 不合格 数量
function QualifiedNum(obj){
	var tr1 = $(obj).closest(".addcopydel").find("table tbody tr");
	var count0=0;
	var count1=0;
	tr1.each(function(trI,trE){
		//.selfCheckResult自检结果 0合格 1不合格
		var val1 = $(trE).find('[name$=".selfCheckResult"]').val();
		if(val1==0){
			count0++;
		}
		else if(val1==1){
			count1++;
		}
	})
	
	$(obj).closest("body").find('[name$=".qualifiedNum"]').val(count0);
	$(obj).closest("body").find('[name$=".unqualifiedNum"]').val(count1);
}

//只能选中一行
function onlyTr(){
	$(document).on('click', '.aedbtns', function () {
		if ($(this).is(":checked")) {
            $(this).closest("tr").siblings().find(".aedbtns").removeAttr("checked");   
        } else {
			top.layer.alert(top.languageInit.allLanguage.mustChooseOne,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
            return false
        }
	})
}
//格式化日期
function formatDate(date){
	var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
}
//需要初始化值的name
function nameStartEndArr(){
	////mes工单  计划开工时间planStartTime，计划完工时间planEndTime,单据日期ProductionWorkOrderGeneral.docDate(不需要初始化)
	//bom 生效日期dEffectiveDate,失效日期     dExpiryDate
	//工作日历 生效日期 effectiveDate，失效日期 expiryDate
	//班次    生效日期 ，实效日期同工作日历  
	var nameArr ={
			"nameStartArr":["dEffectiveDate","effectiveDate"],
			"nameEndArr":["dExpiryDate","expiryDate"]
		}
	return nameArr
}

//静态页面 新增复制行 渲染初始化值
function datepickerDefaultValueObj(datepickerObj){
	var nameArr = nameStartEndArr();
	var nameStartArr = nameArr.nameStartArr;
	var nameEndArr = nameArr.nameEndArr;
	$.each(nameStartArr,function(i,e){
		datepickerObj.find('[name$='+e+']').val(formatDate(new Date()));
	})
	$.each(nameEndArr,function(i,e){
		datepickerObj.find('[name$='+e+']').val("2099-12-31");
	})
}

//动态页面
function datepickerDefaultValueName(datepickerName){
	var datepickerVal="";
	var nameArr = nameStartEndArr();
	var nameStartArr = nameArr.nameStartArr;
	var nameEndArr = nameArr.nameEndArr;
	$.each(nameStartArr,function(i,e){
		if(datepickerName.indexOf(e)!=-1){
			datepickerVal=formatDate(new Date());
		}
	})
	$.each(nameEndArr,function(i,e){
		if(datepickerName.indexOf(e)!=-1){
			datepickerVal="2099-12-31";
		}
	})
	return datepickerVal
}

//新增复制行
function addCopyRow(){
	$(document).on('click', '.addrow, .copyrow', function () {
		var btnType = "";
		if($(this).hasClass("addrow")){
			btnType = "addrow";
		}
		else if($(this).hasClass("copyrow")){
			btnType = "copyrow";
		}
		
		
		var addcopydel = $(this).closest(".addcopydel");
		var tbody = addcopydel.find("table tbody");

		//复制行需要选中一行
		if(btnType == "copyrow" && tbody.find(".aedbtns:checked").length < 1){
			top.layer.alert(top.languageInit.allLanguage.chooseContentCopy,{
				title: top.languageInit.allLanguage.addNode,
				btn: [top.languageInit.allLanguage.setSure]
			}); 
			return false
		}
		//新增行复制第一行，复制行复制选中的一行
		var cloneIndex = 0;
		if(btnType == "copyrow"){
			cloneIndex = tbody.find(".aedbtns:checked").closest("tr").index();
		}
		tbody.append(tbody.find("tr").eq(cloneIndex).clone());
		
		
		
		var firstTr = tbody.find("tr:first");
		var lastTr = tbody.find("tr:last");
		var lastTrIndex = tbody.find("tr:last").index();

		
		if(btnType == "addrow"){
			//新增行需要把clone过来的值全部去掉
			lastTr.find('input').val("");
			//带单位     复制行直接就复制值了所以不需要单位
	        var BaseUnitTransformbaseUnit1 = firstTr.find('[name^="BaseUnitTransform"]').filter('[name$="baseUnit"]');
	        var BaseUnitTransformbaseUnit2 = lastTr.find('[name^="BaseUnitTransform"]').filter('[name$="baseUnit"]');
	        if (BaseUnitTransformbaseUnit1.length > 0) {
	            var val1 = BaseUnitTransformbaseUnit1.val();
	            BaseUnitTransformbaseUnit2.val(val1);
	        }
	        ////新增行 班次 开始时间和结束时间需要赋值
			lastTr.find('[name$="startDate"]').filter('[name^="EngineeringWorkHours"]').val('00:00');
	    	lastTr.find('[name$="endDate"]').filter('[name^="EngineeringWorkHours"]').val('23:59');
		}else if(btnType == "copyrow"){
			//复制行 也需要清除复制过来的id
			lastTr.find('[name$=".id"]').val("");
			//清空 抽样方案 的上限和下限
			lastTr.find('[name$=".spBatchDown"]').val("");
			lastTr.find('[name$=".spBatchUp"]').val("");
			//清空 质检方案 的上限和下限
			lastTr.find('[name$=".rangeDown"]').val("");
			lastTr.find('[name$=".rangeUp"]').val("");
		}
		//新增复制行的 checkbox都需要不选中
		lastTr.find(':checkbox').removeAttr("checked");
		//赋值序列号
		lastTr.find('[name$=".lineNo"]').val(lastTrIndex+1);
		
        //bom新增里面 子项物料编码和子项bom版本
		lastTr.find('[name$=".dMaterialNo"]').removeAttr("disabled").removeClass("removeDisabled");
		lastTr.find('[name$=".dChildBomRev"]').removeAttr("disabled").removeClass("removeDisabled");
		lastTr.find('[name$=".dMaterialNo"]').next().removeClass("divDisabled");
		lastTr.find('[name$=".dChildBomRev"]').next().removeClass("divDisabled");
		
		//新增的时间控件 特殊处理
		lastTr.find(".datepicker").removeAttr("id");
		lastTr.find(".datetimepicker").removeAttr("id");
		lastTr.find(".timepicker").removeAttr("id");
		lastTr.find(".hasDatepicker").removeClass("hasDatepicker");
		lastTr.find(".ui-datepicker-trigger").remove();
		cusdatetimepicker(lastTr);
//		lastTr.find(".datepicker").datepicker({
//	    	changeMonth: true, 
//	    	changeYear: true,
//	    	yearRange: '2019:2099',
//			dateFormat: "yy-mm-dd",
//			showOn: "button",
//			buttonImage: "./../../../../api-b/img/icon/date.jpg",
//			buttonImageOnly: true}); 
//		lastTr.find(".timepicker").timepicker({
//			showOn: "button",
//        	buttonImage: "./../../../../api-b/img/icon/date.jpg",
//        	buttonImageOnly: true
//			})

		if(btnType == "addrow"){
			var datepickerObj = lastTr;
			datepickerDefaultValueObj(datepickerObj);
		}
		
		var lastTrTd = tbody.find("tr:last td");
		
		//[0]生成对应的[index]     生成对应的name
		lastTrTd.each(function(i,e){
			var name1 = $(e).find("input").attr("name") || $(e).find("select").attr("name") || $(e).find("input").attr("namename");
			var detArr = configDetail3;//detail3也可以addrow，有多个[0].[0] 取configPage.js里面的configDetail3
            if(detArr.indexOf($(this).closest('.custabcons').attr("tab"))!=-1){
            	if($(e).find(".aedbtns").length>0){
                    var name2 = name1.replace(/\[(\d+)\]/g, "[" + lastTrIndex + "]");
                }else{
                    //var name2 = name1.replace(new RegExp("(\\d)(\\W+)(\\w+)(\\W+)\\d", 'g'), "$1$2$3$4"+index);
                	var name2 = name1.replace(/(\D+)(\d+)(\D+)(\d+)/g,"$1$2$3"+lastTrIndex)
                }
                
            }else{
            	var name2 = name1.replace(/\[(\d+)\]/g, "[" + lastTrIndex + "]");
            }
            //重新赋值name
            if($(e).find(".aedbtns").length>0){
                $(e).find("input").attr("namename", name2)
            }else{
                $(e).find("input").attr("name", name2);
                $(e).find("select").attr("name", name2);
            }
		})
		
		
		
		//需要新增obj2和detail3对应的东西
        var btn = $(this);
        obj2detail3(btn,btnType,cloneIndex);
        
        //渲染計算
        //readyCalculation()
        
		//check
		//formcheck.check(1);
	})
}

//删除行
function delrow(){
    $(document).on('click', '.delrow', function () {

        //mes工单		（明细信息 执行信息                                         生产用料清单）（1：1：N）
        //子件工单 		（明细信息 执行信息                                         生产用料清单）（1：1：N）
        //工艺路线 流转卡 （工序列表 委外工序信息                  样式信息）（1：1：1）
        //流转卡 		（工序列表 委外工序信息  执行信息 样式信息）（1：1：1：1）
    	var form = $(this).closest("form");
        var addcopydel = $(this).closest(".addcopydel");
        var tbody = addcopydel.find("table tbody");
        
        if (tbody.find(".aedbtns:checked").length == 0) {
            top.layer.alert(top.languageInit.allLanguage.selectAtLeastOneToDelete,{
            	title: top.languageInit.allLanguage.addNode,
				btn: [top.languageInit.allLanguage.setSure]
            })
        }else {
        	var checkedindex = tbody.find(".aedbtns:checked").closest("tr").index();
        	
            if(tbody.find("tr").length==1){
                tbody.find("tr input:not([name$=lineNo])").val("");
                tbody.find("tr :checkbox").removeAttr("checked");
                //detail1 obj2 detail3的情况，detail1只有一条时，保留行，清空数据，obj2 detail3也要保留最后一个，但是要清空数据
                if(addcopydel.closest(".custabcons[tab='"+top.languageInit.allLanguage.detailInfo+"']").length>0 || addcopydel.closest(".custabcons[tab='工序列表']").length>0){
                    var objDetArr = pageObjDet();
                	if(objDetArr!=false){
                		var objArr = objDetArr[0];
                    	var detArr = objDetArr[1];
                		//objArr
                    	$.each(objArr,function(objArrI,objArrE){
                    		if(objArrI!=0){
                    			$('.custabcons[tab="'+objArrE+'"]').find(".layui-form-item[name='["+checkedindex+"]'] input").val('');
                    			$('.custabcons[tab="'+objArrE+'"]').find(".layui-form-item[name='["+checkedindex+"]'] input").attr('value','');
                    		}
                            
                        })
                    	
                        //detArr
                        $.each(detArr,function(detArrI,detArrE){
                            $('.custabcons[tab="'+detArrE+'"]').find(".addcopydel[name='["+checkedindex+"]'] input").val('');
                            $('.custabcons[tab="'+detArrE+'"]').find(".addcopydel[name='["+checkedindex+"]'] input").attr('value','');
                        })
                	}

                }
                return false
            }else if(tbody.find(".aedbtns:checked").length  >1){
				top.layer.alert(top.languageInit.allLanguage.onlyOneCanBeSelectedForDeletion,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});

                return false
            }
            
            
           //班次行删除，重新计算，主表的工作时间EngineeringWorkHours[0].workingHours
            if(tbody.find(".aedbtns:checked").closest("tr").find('[name$="workingHours"]').filter('[name^="EngineeringWorkHours"]').length>0){
            	var workingHoursTrVal = tbody.find(".aedbtns:checked").closest("tr").find('[name$="workingHours"]').filter('[name^="EngineeringWorkHours"]').val();
            	//EngineeringWorkNumbers.workingHours
            	var workingHoursObj = form.find('.layui-form-item [name$="workingHours"]').filter('[name^="EngineeringWorkNumbers"]');
            	var workingHoursVal = workingHoursObj.val();
            	workingHoursObj.val(workingHoursVal-workingHoursTrVal);
            }
            
            tbody.find(".aedbtns:checked").closest("tr").remove();
            
            //obj2和detail3对应删除
            if(addcopydel.closest(".custabcons[tab='"+top.languageInit.allLanguage.detailInfo+"']").length>0 || addcopydel.closest(".custabcons[tab='工序列表']").length>0){
                var objDetArr = pageObjDet();
            	if(objDetArr!=false){
            		var objArr = objDetArr[0];
                	var detArr = objDetArr[1];
            		//objArr
                	$.each(objArr,function(objArrI,objArrE){
                		if(objArrI!=0){
                			$('.custabcons[tab="'+objArrE+'"]').find(".layui-form-item[name='["+checkedindex+"]']").remove();
                            $('.custabcons[tab="'+objArrE+'"]').find(".layui-form-item[name='[0]']").show();
                            $('.custabcons[tab="'+objArrE+'"]').find(".layui-form-item").each(function(i,e){
                                var eindex = $(e).index();
                                $(e).attr("name","["+eindex+"]");
                                var ehtml1 = $(e).html();
                                var ehtml2 = ehtml1.replace(/ name=(\D+)(\d+)/g," name=$1"+eindex);
                                $(e).empty();
                                $(e).append(ehtml2);
                            })
                		}
                        
                    })
                	
                    //detArr
                    $.each(detArr,function(detArrI,detArrE){
                        $('.custabcons[tab="'+detArrE+'"]').find(".addcopydel[name='["+checkedindex+"]']").remove();
                        $('.custabcons[tab="'+detArrE+'"]').find(".addcopydel[name='[0]']").show();
//                        $('.custabcons[tab="'+detArrE+'"]').find(".addcopydel").each(function(i,e){
//                            var eindex = $(e).index();
//                            $(e).attr("name","["+eindex+"]");
//                            var ehtml1 = $(e).html();
//                            var ehtml2 = ehtml1.replace(/ name=(\D+)(\d+)/g," name=$1"+eindex);
//                            $(e).empty();
//                            $(e).append(ehtml2);
//                        })
                        
                        //修改 addcopydel 的name
                        $('.custabcons[tab="'+detArrE+'"]').find(".addcopydel").each(function(i,e){
                        	$(e).attr("name","["+ $(e).index() +"]")
                        })
                        
                        //tr里面的name
                        $('.custabcons[tab="'+detArrE+'"]').find("table tbody tr td input").each(function(i,e){
                        	var index1 = $(e).closest(".addcopydel").index();
                        	if($(e).attr("name")!=undefined){
                        		var name1 = $(e).attr("name");
                            	name1 = name1.replace(/(\d+)(\D+)(\d+)/g,index1+"$2$3");
                        	}else if($(e).attr("namename")!=undefined){
                        		var name1 = $(e).attr("namename");
                            	name1 = name1.replace(/(\d+)/g,index1);
                        	}
                        	$(e).attr("name",name1);
                        })
                        
                        //赋值序号
                        $('.custabcons[tab="'+detArrE+'"]').find(".addcopydel table tbody tr").each(function(i,e){
                        	$(e).find('[name$=".lineNo"]').val(parseFloat($(e).index())+1);
                            $(e).find('[name$=".lineNo"]').attr("value",parseFloat($(e).index())+1);
                        })
                        
                    })
            	}

            }
        }

        //detail3可以也有删除行
        tbody.find("td").each(function (i, e) {
            var index = $(e).closest("tr").index();
            var name1 = $(e).find("input").attr("name") || $(e).find("select").attr("name") || $(e).find("input").attr("namename");
            if(name1!=undefined){
                var num1 = name1.split("[")[1];
                var num2 = num1.split("]")[0];
                //var name2 = name1.replace(new RegExp(num2, 'g'), index);
                var detArr = [top.languageInit.allLanguage.productionMaterialUse,top.languageInit.allLanguage.checkInfo,top.languageInit.allLanguage.sn];
                if(detArr.indexOf($(this).closest('.custabcons').attr("tab"))==-1){
                    var name2 = name1.replace(new RegExp(num2, 'g'), index)
                }
                else{
                    if($(e).find(".aedbtns").length>0){
                        var name2 = name1.replace(new RegExp("\\d", 'g'), index);
                    }
                    else{
                        var name2 = name1.replace(new RegExp("(\\d)(\\W+)(\\w+)(\\W+)\\d", 'g'), "$1$2$3$4"+index);
                    }

                }
            }
//                else {
//                    //序号
//                    $(e).text(index+1)
//                }

            if($(e).find(".aedbtns").length>0){
                $(e).find("input").attr("namename", name2)
            }else{
                $(e).find("input").attr("name", name2)
            }

            //赋值序号
            if(name1.indexOf("lineNo")!=-1){
                $(e).find("input").val(parseFloat(index)+1);
                $(e).find("input").attr("value",parseFloat(index)+1);
            }


        })

    })

}

//多级菜单
function menulevel(){
	$(document).on('mouseleave', '.menulevel', function () {
        //menulevelc
        $(this).find(".menulevelc").hide();
        $(this).find(".menulevelc2").hide();
    })
    $(document).on('hover', '.menulevelt', function () {
        //menulevelc
        var menulevelc = $(this).next();
        menulevelc.show();
    })
    $(document).on('hover', '.menulevelc1>li', function () {
        $(this).closest(".menulevelc1").find(".menulevelc2").hide();
        var menulevelc2 = $(this).find(".menulevelc2");
        menulevelc2.show();
        menulevelc2.css({"margin-top":"-30px"})
    })
}

//addEditDelJsplumb
function addEditDelJsplumb(){
	$("#addeditbaseProcessRoute").click(function(){
    	var content = srcurl();
		top.layer.open({
            type: 2
            , id:"jsPlumb"
            , title: top.languageInit.allLanguage.newProcess
            , shadeClose: false
            , area: ['1000px', '600px']
            , content: content+'JsPlumb/jsplumb.html'
            , btn: [top.languageInit.allLanguage.setSure, top.languageInit.allLanguage.cancelSet]
            , yes: function (index, layero) {
            	//表单页面的验证统一入口
            	
            	var inputs = layero.find("iframe").contents().find('.layui-inline');
        		var formcheckBack = formcheck.check(0, inputs);
        		if(!formcheckBack){ //如果验证不通过，就不执行下面的行为
        			return false;
        		}
            	var btnSaveClick = layero.find("iframe").contents().find("#saveDrawing").click();
                //删除所有行，保留第一行
               top.layer.close(index); //如果设定了yes回调，需进行手工关闭
               //$(".custabcons .revertDisabled").attr("disabled",true);
            }, 
            end: function (index, layero) {
                top.layer.close(index); //如果设定了yes回调，需进行手工关闭
                $(".custabcons .revertDisabled").attr("disabled",true);
            },
            zIndex: 1001
        });
	})
	
	$("#delbaseProcessRoute").click(function(){
		 top.layer.confirm(top.languageInit.allLanguage.sureToDeleteProcess, {
			 title: top.languageInit.allLanguage.tips,
             btn: [top.languageInit.allLanguage.setSure, top.languageInit.allLanguage.cancelSet] //按钮
         },
         function (index, layero) {
        	 clearTableJsplumb();
        	 top.layer.close(index);
         },
         function (index, layero) {
             top.layer.close(index); //如果设定了yes回调，需进行手工关闭
         });
		
	})
	//清空弹窗下面表格中的数据
	function clearTableJsplumb(){
		var iframeObj = top.$("#admin-body iframe:visible").contents();
		iframeObj.find('.custabcons[tab="'+top.languageInit.allLanguage.processList+'"] table tbody tr:not(:first-child)').remove();
		iframeObj.find('.custabcons[tab="'+top.languageInit.allLanguage.processList+'"] table tbody tr:first-child input').val('');
		iframeObj.find('.custabcons[tab="'+top.languageInit.allLanguage.processList+'"] table tbody tr:first-child select').val('');
		iframeObj.find('.custabcons[tab="'+top.languageInit.allLanguage.processList+'"] table tbody tr:first-child').show();
   	 
		iframeObj.find('.custabcons[tab="'+top.languageInit.allLanguage.outProcessInfo+'"] .layui-form-item:not(:first-child)').remove();
		iframeObj.find('.custabcons[tab="'+top.languageInit.allLanguage.outProcessInfo+'"] .layui-form-item:first-child input').val('');
		iframeObj.find('.custabcons[tab="'+top.languageInit.allLanguage.outProcessInfo+'"] .layui-form-item:first-child').show();
   	 
		iframeObj.find('.custabcons[tab="样式信息"] .layui-form-item:not(:first-child)').remove();
		iframeObj.find('.custabcons[tab="样式信息"] .layui-form-item:first-child input').val('');
		iframeObj.find('.custabcons[tab="样式信息"] .layui-form-item:first-child').show();
   	 
		iframeObj.find('.custabcons[tab="连线信息"] ').find('[class$="Connection"]').empty();
	}
}

//implementation 查看流转卡执行情况     工单进度
function implementation(){
	$("#implementation").click(function(){
		var parmId = $(this).attr("parmId");
		
		var src = top.$("#admin-body iframe:visible").attr("src");
		
		if($("#list").length>0){
			var selectData = rowData($(this));
		}
		if(selectData == false){
			return false
		}
		
		//var mainId = selectData.mainId;
		if($("#list").length>0){
			var mainId = selectData[""+parmId+""];
		}else{
			//var mainId = (src.split("?")[1]).split("/")[1];
			var dataParmJsonArr = pagekeyText();
			var urlMessage = localStorage.getItem(dataParmJsonArr);
			var mainId = JSON.parse(urlMessage)[0].mainId;
		}
		
		//title
		if(src.indexOf("startReport")!=-1){
			var titles = top.languageInit.allLanguage.orderProcess;
			var paramStr = "startReport";
		}else if(src.indexOf("completeReport")!=-1){
			var titles = top.languageInit.allLanguage.orderProcess;
			var paramStr = "completeReport";
		}else if(src.indexOf("startEdit")!=-1){
			var titles = top.languageInit.allLanguage.orderProcess;
			var paramStr = "startEdit";
		}else if(src.indexOf("completeEdit")!=-1){
			var titles = top.languageInit.allLanguage.orderProcess;
			var paramStr = "completeEdit";
		}else if(src.indexOf("productionExecution/search")!=-1){
			var titles = top.languageInit.allLanguage.orderProcess;
			var paramStr = "productionExecution";
		}else if(src.indexOf("flowCard")!=-1){
			var titles = top.languageInit.allLanguage.viewFlowcardExeinfo;
			var paramStr = "flowCard";
		}else if(src.indexOf("productionOutSourceAccount/search")!=-1){
			var titles = top.languageInit.allLanguage.generateFlowCardImplementation;
			var paramStr = "productionOutSourceAccount";
		}else if(src.indexOf("OutSourcesReceiveSearch")!=-1){
			var titles = top.languageInit.allLanguage.orderProcess;
			var paramStr = "productionOutSourcesReceive";
		}else if(src.indexOf("OutSourcesSendSearch")!=-1){
			var titles = top.languageInit.allLanguage.orderProcess;
			var paramStr = "productionOutSourcesSend";
		}
		
		var content = srcurl();
		top.layer.open({
            type: 2
            , title: titles
            , shadeClose: true
            , area: ['1000px', '600px']
            , content: content+'JsPlumb/jsplumb.html?'+mainId+"/"+paramStr
            , btn: [top.languageInit.allLanguage.setSure, top.languageInit.allLanguage.cancelSet]
            , yes: function (index, layero) {
                //layero.find("iframe").contents().find("#btn_save").click();
                //删除所有行，保留第一行
                top.layer.close(index); //如果设定了yes回调，需进行手工关闭
            }
            , btn2: function (index, layero) {
                top.layer.close(index); //如果设定了yes回调，需进行手工关闭
            }
        });
	})
}

//判断日期的先后
function dateCharge(firstDate,secondDate){
	//html1.replace(new RegExp(0, 'g'), num1);
	var first=new Date(firstDate.replace(new RegExp("-", 'g'), "/"));
	var second=new Date(secondDate.replace(new RegExp("-", 'g'), "/"));
  	if(first>second){ 
  		return false;
  	}
  	return true;
}  



//判断时间在不在一个时间段之间
function periodDateTime(startDateTime,endDateTime,datetime){
	if(startDateTime==""){startDateTime="1000-01-01"}
	if(endDateTime==""){endDateTime="9999-12-31"}
	//因为时间戳按照8点算，所以要修改生效时间为0.0.0，失效时间为23.59.59
	if(new Date(startDateTime).getTime()-28800000 <= new Date(datetime).getTime() && new Date(datetime).getTime() <= new Date(endDateTime).getTime()+57599000){
		return true;
	}
	return false;
}

//改变生效日期或失效日期时，判断工作时段每一行的开始时间和结束时间在不在区间里
function periodDateN(effectiveDate,expiryDate){
	//startDate endDate
   	var alertInfo='';
    $('.custabcons[tab="工作时段"] table tbody tr').each(function(i,e){
    	var startTime = effectiveDate;
    	var endTime = expiryDate;
    	
    	var time = $(e).find("[name$='startDate']").val();
    	if(time!=''){
    		var flag = periodDateTime(startDateTime,endDateTime,datetime);
    		//开始时间
    		if(!flag)
    	   	{
    			alertInfo+=top.languageInit.allLanguage.first+(i+1)+top.languageInit.allLanguage.startTimeNotBetweenEffectiveAndExpiration+"<br/>"
    	   		$(e).find("[name$='startDate']").val('');
    	   	}
    	}
		
		//结束时间
		var time = $(e).find("[name$='endDate']").val();
		if(time!=''){
			var flag = periodDateTime(startDateTime,endDateTime,datetime);
    		if(!flag)
    	   	{
    			alertInfo+=top.languageInit.allLanguage.first+(i+1)+top.languageInit.allLanguage.endTimeNotBetweenEffectiveAndExpiration+"<br/>"
    	   		$(e).find("[name$='endDate']").val('');
    	   	}
		}
    })
   	if(alertInfo!=''){
   		top.layer.alert(alertInfo,{
			btn: [top.languageInit.allLanguage.sure],
			title: top.languageInit.allLanguage.info
		});
   	}
}

//生效日期和失效日期 
//原先是 effectiveDate,expiryDate改为ffectiveDate,xpiryDate模糊匹配，防止有前缀
function effExpDate(){
	$(document).on('change', 'input[name$="ffectiveDate"]', function () {
		var effectiveDate = $(this).val();
		var expiryDate= $("input[name$='xpiryDate']").val();
		if($(this).closest("td").length>0){
			expiryDate= $(this).closest("tr").find("input[name$='xpiryDate']").val();
		}
	      
	  	var mainFlag = dateCharge(effectiveDate,expiryDate);
	   	if(!mainFlag)
	   	{
			top.layer.alert(top.languageInit.allLanguage.effectiveCannoGreaterThanExpiration,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
	   		$(this).val(expiryDate);
	   		return;
	   	}
	   	//startDate endDate
	   	//periodTimeN(effectiveDate,expiryDate)
	   	
	   	//赋值工作时间（小时）
//	   	var thisObj = $(this);
//	   	cusTimeSheetS2(thisObj);
	    
	  })
	  
	$(document).on('change', 'input[name$="xpiryDate"]', function () {
		var expiryDate    = $(this).val();
		var effectiveDate = $("input[name$='ffectiveDate']").val();
		if($(this).closest("td").length>0){
			effectiveDate= $(this).closest("tr").find("input[name$='ffectiveDate']").val();
		}
	    
		var mainFlag = dateCharge(effectiveDate,expiryDate);
	 	if(!mainFlag)
	 	{
			top.layer.alert(top.languageInit.allLanguage.effectiveCannoGreaterThanExpiration,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

	 		$(this).val(effectiveDate);
	 		return;
	 	}
	 	//startDate endDate
	   	//periodTimeN(effectiveDate,expiryDate)
	 	
	 	//赋值工作时间（小时）
//	   	var thisObj = $(this);
//	   	cusTimeSheetS2(thisObj);
	})
}
 


//开始时间和结束时间 表格里面的 排除 班次新增里面的
function startEndDate(){
	$(document).on('change', 'td input[name$="startDate"]:not(.timepicker)', function () {
		var startDate = $(this).val();
		var endDate = $(this).closest("tr").find("input[name$='endDate']").val();
		if (!endDate) return
		var flag = dateCharge(startDate,endDate);
       	if(!flag)
       	{
			top.layer.alert(top.languageInit.allLanguage.startTimeCannotGreaterThanEnd,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

       		$(this).val(endDate);
       		return;
       	}
//       	//生效日期effectiveDate     失效日期expiryDate
//       	var startTime = $(this).closest("form").find("input[name$='effectiveDate']").val();
//       	var endTime = $(this).closest("form").find("input[name$='expiryDate']").val();
//       	var time = $(this).val();
//       	flag = periodTime(startTime,endTime,time);
//       	if(!flag)
//       	{
//       		top.layer.alert("开始时间不在生效时间和失效时间之间");
//       		$(this).val('');
//       		return;
//       	}
	})
	  
	$(document).on('change', 'td input[name$="endDate"]:not(.timepicker)', function () {
		var endDate = $(this).val();
		var startDate = $(this).closest("tr").find("input[name$='startDate']").val();
		
		var flag = dateCharge(startDate,endDate);
       	if(!flag)
       	{
			top.layer.alert(top.languageInit.allLanguage.startTimeCannotGreaterThanEnd,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

       		$(this).val(startDate);
       		return;
       	}
//       	//生效日期effectiveDate     失效日期expiryDate
//       	var startTime = $(this).closest("form").find("input[name$='effectiveDate']").val();
//       	var endTime = $(this).closest("form").find("input[name$='expiryDate']").val();
//       	var time = $(this).val();
//       	flag = periodTime(startTime,endTime,time);
//       	if(!flag)
//       	{
//       		top.layer.alert("结束时间不在生效时间和失效时间之间");
//       		$(this).val('');
//       		return;
//       	}
	})
	
	
	$(document).on('change', 'input[name$="tartTime"]', function () {
		var startDate = $(this).val();
		var endDate = $(this).closest("tr").find("input[name$='ndTime']").val();
		
		var flag = dateCharge(startDate,endDate);
       	if(!flag)
       	{
			top.layer.alert(top.languageInit.allLanguage.startTimeCannotGreaterThanEnd,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

       		$(this).val(endDate);
       		return;
       	}
	})
	  
	$(document).on('change', 'input[name$="ndTime"]', function () {
		var endDate = $(this).val();
		var startDate = $(this).closest("tr").find("input[name$='tartTime']").val();
		
		var flag = dateCharge(startDate,endDate);
       	if(!flag)
       	{
			top.layer.alert(top.languageInit.allLanguage.startTimeCannotGreaterThanEnd,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

       		$(this).val(startDate);
       		return;
       	}
	})

}

//流转卡页面时间校验
function dateCheck(){
	//主表开始时间
	$(document).on('change', '.layui-form-item input[name$=".startDate"]', function () {
		var currentDom =$(this);
		var startDate = $(this).val();
		var completedDate= $(this).closest("form").find("input[name$='.completedDate']").first().val();
		if (!completedDate) return
		var flag = dateCharge(startDate,completedDate);
       	if(!flag)
       	{
			top.layer.alert(top.languageInit.allLanguage.startTimeCannotGreaterThanCompletion,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

       		$(this).val(completedDate);
       		return;
       	}
       	//和明细开始时间做对比
       	$(this).closest("form").find('td input[name$=".startDate"]').each(function(index,e){
        	 var dateTemp = $(e).val();
        	 if (!dateTemp) return
        	 flag = dateCharge(startDate,dateTemp);
    		if(!flag)
           	{
				top.layer.alert(top.languageInit.allLanguage.startTimeCannotGreaterThanStartInProcess,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});

           		$(currentDom).val("");
           		return;
           	}
        });     
	});
	//主表完工时间
	$(document).on('change', '.layui-form-item input[name$=".completedDate"]', function () {
		var currentDom =$(this);
		var completedDate = $(this).val();
		var startDate= $(this).closest("form").find("input[name$='.startDate']").first().val();
		if (!startDate) return
		var flag = dateCharge(startDate,completedDate);
       	if(!flag)
       	{
       		top.layer.alert(completionDateCannotLessThanStartTime,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
       		$(this).val(top.languageInit.allLanguage.completedDate);
       		return;
       	}
       	//和明细开始时间做对比
       	$(this).closest("form").find('td input[name$=".completedDate"]').each(function(index,e){
        	 var dateTemp = $(e).val();
        	 if (!dateTemp) return
        	 flag = dateCharge(dateTemp,completedDate);
    		if(!flag)
           	{
				top.layer.alert(top.languageInit.allLanguage.completionTimeCannotLessThanCompletionTimeInProcess,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});

           		$(currentDom).val("");
           		return;
           	}
        });     
	});
	//明细开工时间
	$(document).on('change', '.addcopydel input[name$=".startDate"]:not(.timepicker)', function () {
		var startDate = $(this).val();
		
		//先判断主表开工时间是否已经设置
		var startDateBefore = $(this).closest("form").find("input[name$='.startDate']").first().val();
		if(!startDateBefore){
			top.layer.alert(top.languageInit.allLanguage.setStartTimeInBasicInformationFirst,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

			return
		}
		 flag = dateCharge(startDateBefore,startDate);
 			if(!flag)
        	{
    			top.layer.alert(top.languageInit.allLanguage.startUpTimeGreaterThanStartUpTimeInBasic,{
    				btn: [top.languageInit.allLanguage.sure],
    				title: top.languageInit.allLanguage.info
    			});
        		$(this).val("");
        		return;
        	}
		
		var completedDate= $(this).closest("tr").find("input[name$='.completedDate']:not(.timepicker)").first().val();
		if (!completedDate) return
		var flag = dateCharge(startDate,completedDate);
       	if(!flag)
       	{
			top.layer.alert(top.languageInit.allLanguage.processStartUpTimeLessThanProcessCompletionTime,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
       		$(this).val(completedDate);
       		return;
       	} 
	});
	//明细完工时间
	$(document).on('change', '.addcopydel input[name$=".completedDate"]', function () {
		var completedDate = $(this).val();
		
		//先判断主表开工时间是否已经设置
		var completedDateBefore = $(this).closest("form").find("input[name$='.completedDate']").first().val();
		if(!completedDateBefore){
			top.layer.alert(top.languageInit.allLanguage.setCompletionTimeInBasicFirst,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

			return
		}
		 flag = dateCharge(completedDate,completedDateBefore);
 			if(!flag)
        	{
        		top.layer.alert(top.languageInit.allLanguage.completionTimeOfProcessLessThanCompletionTimeInBasic,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});
        		$(this).val(completedDate);
        		return;
        	}
		
		var startDate= $(this).closest("tr").find("input[name$='.startDate']").first().val();
		if (!startDate) return
		var flag = dateCharge(startDate,completedDate);
       	if(!flag)
       	{
			top.layer.alert(top.languageInit.allLanguage.processCompletionTimeGreaterThanProcessStartUpTime,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

       		$(this).val(completedDate);
       		return;
       	} 
	});
}

//相差天数
function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
    var dateSpan,
        tempDate,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
};

//主表的工作时间（小时）
function cusTimeSheetS2(thisObj){
//	var effectiveDate = thisObj.closest("form").find('.layui-form-item [name$="effectiveDate"]').val();
//	var expiryDate = thisObj.closest("form").find('.layui-form-item [name$="expiryDate"]').val();
//	if(effectiveDate==""||expiryDate==""){
//		return false
//	}else{
//		var days = datedifference(effectiveDate, expiryDate)+1;
//	}
	var workingHoursValSum = 0;
	//因为子表和主表都触发该时间，所以下面需要closest form
	thisObj.closest("form").find("table tbody tr").each(function(i,e){
		var workingHoursVal = Number($(e).find('[name$="workingHours"]').val());
		if(workingHoursVal==""){
			workingHoursVal=0;
		}
		workingHoursValSum+=workingHoursVal;
	})
	if(workingHoursValSum>24){
		top.layer.alert(top.languageInit.allLanguage.moreThan24Hours,{
			btn: [top.languageInit.allLanguage.sure],
			title: top.languageInit.allLanguage.info
		});
		workingHoursValSum = workingHoursValSum-thisObj.closest("tr").find('[name$="workingHours"]').val();
		thisObj.val("");
		thisObj.closest("tr").find('[name$="workingHours"]').val("");
	}
	thisObj.closest("form").find('.layui-form-item [name$="workingHours"]').val(workingHoursValSum);
}

//班次 工作小时数     workingHours
////startDate timepicker
////endDate timepicker
function cusTimeSheet(){
	//行里面的工作小时数
	function cusTimeSheetS1(thisObj){
		var startDate = thisObj.closest("tr").find('[name$="startDate"]').val();
		var endDate = thisObj.closest("tr").find('[name$="endDate"]').val();
		if(startDate==""||endDate==""){
			return false
		}
		startDate = Number(startDate.replace(":","."));
		endDate = Number(endDate.replace(":","."));
		if(startDate>=endDate){
			endDate = endDate+24;
		}
		var minusVal = (endDate-startDate).toFixed(2);
		minusVal = (Number(minusVal.split('.')[0] + '.' + (minusVal.split('.')[1]*10/6).toFixed(0))).toFixed(2);
		thisObj.closest("tr").find('[name$="workingHours"]').val(minusVal);
	}
	
	$(document).on('change', '.timepicker[name$=".startDate"], .timepicker[name$=".endDate"]', function () {
		var thisObj = $(this);
		var indexArray = periodTime(thisObj);
		if($.isEmptyObject(indexArray)){
			cusTimeSheetS1(thisObj);
			cusTimeSheetS2(thisObj);	
		}else{
			top.layer.msg(top.languageInit.allLanguage.timeYouChoose+indexArray+top.languageInit.allLanguage.intersectionOfLineTime)	
			$(this).val("");
		}
	})
	

}

//判断时间段time不能交叉
function periodTime(thisObj){
	//判断thisObj是开始时间还是结束时间
	var thisName = thisObj.attr("name").indexOf("startDate")!=-1 ? "startDate" : "endDate";
	var otherName = thisName == "startDate" ? "endDate" : "startDate";
	
	var allTr = thisObj.closest("tbody").find("tr");
	var thisIndex = thisObj.closest("tr").index();
	var array = [];
	
	
	allTr.each(function(i,e){
		var firstVal = $(allTr[0]).find('[name$="startDate"]').val();

		var startTime = $(e).find('[name$="startDate"]').val();
		var endTime = $(e).find('[name$="endDate"]').val();
		var otherVal = thisObj.closest("tr").find('[name$='+otherName+']').val();
		var time = thisObj.val();
		//time!="" 防止置空后点击空白又重新change
		if(i!=thisIndex && startTime!="" && endTime!="" && time!="" ){
			startTime = parseFloat(startTime.replace(":","."));
			endTime = parseFloat(endTime.replace(":","."));
			time = parseFloat(time.replace(":","."));
			
			firstVal = parseFloat(firstVal.replace(":","."));
			
			if(i!=0){
				startTime = startTime<=firstVal?startTime+24:startTime;
			}
			endTime = endTime<=firstVal?startTime+24:startTime;
			time = time<=firstVal?time+24:time;
					
			
			//如果写！= 会出现0==“”的错误
			if(otherVal!==""){
				otherVal = parseFloat(otherVal.replace(":","."));
				otherVal = otherVal<=firstVal?otherVal+24:otherVal;
				
				if(thisName == "endDate" && time <= otherVal){
					time = time+24;
				}
				if( (otherVal<startTime && time>startTime) || (otherVal>endTime && time<endTime) ){
					array.push(i+1);
				}
			}
			if(startTime < time && time < endTime){
				array.push(i+1)
			}
		}
	})
	return array
	
}

//检验单新增 选单 QcCheckList.dataSize 3其他检验单 1自制工序检验单 2委外工序检验单 4工序巡检单
function dataSizeChange(){
	$('[name="QcCheckList.dataSize"]').change(function(){
		var thisVal = $(this).val();
		if(thisVal == 3){
			$('button.back').attr("disabled","disabled");
			$('button.back').addClass("layui-btn-disabled")
		}
		else{
			$('button.back').removeAttr("disabled");
			$('button.back').removeClass("layui-btn-disabled")
		}
	})
}

//获取单位比例换算单位数量 比例数量
function proportionQuantity(changeUnit){
	$(document).on('keyup', '.'+changeUnit+'', function () {
		var thisinput = $(this);
		var thisVal = $(this).val();
		var thisTr = $(this).closest('tr');
		var thisUnitV = thisTr.find('.'+changeUnit.split('N')[0]).val();
		
		var basicUnitV = thisTr.find('.basicUnit').val();
		var inventoryUnitV = thisTr.find('.inventoryUnit').val();
		var stockAuxiliaryV = thisTr.find('.stockAuxiliary').val();
		var productionUnitV = thisTr.find('.productionUnit').val();
		
		//单位一样
		if(thisUnitV!=''){
			if(thisUnitV == basicUnitV){
				thisTr.find('.basicUnitN').val(thisVal);
			}else if(thisUnitV == inventoryUnitV){
				thisTr.find('.inventoryUnitN').val(thisVal);
			}else if(thisUnitV == stockAuxiliaryV){
				thisTr.find('.stockAuxiliaryN').val(thisVal);
			}else if(thisUnitV == productionUnitV){
				thisTr.find('.productionUnitN').val(thisVal);
			}
		}else{
			top.layer.alert(top.languageInit.allLanguage.pleaseChooseMaterialNo+'！',{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
			$(this).val('');
			return false
		}
			
		var scaleV = thisTr.find('[name$="scale"]').val();
		var scaleVJsonArr = JSON.parse(scaleV);
		$.each(scaleVJsonArr,function(i,e){
			$.each(Object.keys(e),function(ii,ee){
				var prefix = ee.split('.')[0]+'.';
				if(thisUnitV == e[prefix+'transformUnit']){
					var proportion = e[prefix+'baseUnitNum'] / e[prefix+'transformUnitNum'] * thisVal;
					thisTr.find('.basicUnitN').val(proportion);
				}
			})
			$.each(Object.keys(e),function(ii,ee){
				var prefix = ee.split('.')[0]+'.';
				var basicUnitNV = thisTr.find('.basicUnitN').val();
				if(inventoryUnitV == e[prefix+'transformUnit']){
					var proportion = e[prefix+'transformUnitNum'] / e[prefix+'baseUnitNum'] * basicUnitNV;
					thisTr.find('.inventoryUnitN').val(proportion)
				}else if(stockAuxiliaryV == e[prefix+'transformUnit']){
					var proportion = e[prefix+'transformUnitNum'] / e[prefix+'baseUnitNum'] * basicUnitNV;
					thisTr.find('.stockAuxiliaryN').val(proportion)
				}else if(productionUnitV == e[prefix+'transformUnit']){
					var proportion = e[prefix+'transformUnitNum'] / e[prefix+'baseUnitNum'] * basicUnitNV;
					thisTr.find('.productionUnitN').val(proportion)
				}
			})			
		})		
	})
}

function unitConversion(changeUnit,changeUnitIndex){
	  ////基础单位数量     .basicUnitN .basicUnit
	  ////库存单位数量     .inventoryUnitN .inventoryUnit
	  ////库存辅单位数量     .stockAuxiliaryN .stockAuxiliary
	  ////生产单位数量     .productionUnitN .productionUnit
	function unitRatio(obj,scaleArr,changeUnit){
		//得到单位
	 	var baseName = obj.closest("tr").find('.basicUnit').val();
	 	var inventoryUnit = obj.closest("tr").find('.inventoryUnit').val();
	 	var stockAuxiliary = obj.closest("tr").find('.stockAuxiliary').val();
	 	var productionUnit = obj.closest("tr").find('.productionUnit').val();
	 	
	 	if(baseName!=undefined){
	 		//不能else 因为都要执行
	 		var tofixed = scaleArr[0].split("-")[2];
	 		if(scaleArr[0]==undefined){
	 			tofixed = "00";
	 		}
	 		if(inventoryUnit!=undefined && scaleArr[0]=="" && baseName==inventoryUnit){
		 		scaleArr[0] = "1.0-1.0-"+tofixed;
		 	}
	 		if(stockAuxiliary!=undefined && scaleArr[1]=="" && baseName==stockAuxiliary){
		 		scaleArr[1] = "1.0-1.0-"+tofixed;
		 	}
	 		if(productionUnit!=undefined && scaleArr[2]=="" && baseName==productionUnit){
		 		scaleArr[2] = "1.0-1.0-"+tofixed;
		 	}
	 	}
	 	return scaleArr
	}
	
	$(document).on('focus', '.'+changeUnit+'', function () {
		var scaleV = $(this).closest("tr").find('[name$="scale"]').val();
		var scaleArr = scaleV.split("&");
		var obj = $(this);
	 	// 单位一样1:1
	 	scaleArr = unitRatio(obj,scaleArr);
	 	
	 	//得到单位obj
	 	var baseName = obj.closest("tr").find('.basicUnit');
	 	var inventoryUnit = obj.closest("tr").find('.inventoryUnit');
	 	var stockAuxiliary = obj.closest("tr").find('.stockAuxiliary');
	 	var productionUnit = obj.closest("tr").find('.productionUnit');
	 	
	 	var changeUnitUnit = changeUnit.split('N')[0];
	 	changeUnitUnit = obj.closest("tr").find('.'+changeUnitUnit);
	 	
	 	if(scaleArr[0].indexOf("-")==-1 || scaleArr[1].indexOf("-")==-1 || scaleArr[2].indexOf("-")==-1){
	 		var alertMsg='';
	 		if(scaleArr[changeUnitIndex].indexOf("-")==-1 && changeUnitUnit.val()!=baseName.val()){
	 			alertMsg+=top.languageInit.allLanguage.quantityAndBasicUnit+"<br/>"
		 	}
	 		if(scaleArr[0].indexOf("-")==-1 && changeUnitIndex!=0 && inventoryUnit.length>0 && changeUnitUnit.val()!=inventoryUnit.val()){
		 		alertMsg+=top.languageInit.allLanguage.inventoryAndBasicUnit+"<br/>"
		 	}
	 		if(scaleArr[1].indexOf("-")==-1 && changeUnitIndex!=1  && stockAuxiliary.length>0 && changeUnitUnit.val()!=stockAuxiliary.val()){
		 		alertMsg+=top.languageInit.allLanguage.stockAuxiliaryAndBasicUnit+"<br/>"
		 	}
	 		if(scaleArr[2].indexOf("-")==-1 && changeUnitIndex!=2  && productionUnit.length>0 && changeUnitUnit.val()!=productionUnit.val()){
		 		alertMsg+=top.languageInit.allLanguage.productionAndBasicUnit+"<br/>"
		 	}
	 		top.layer.msg(alertMsg,{time: 3000});
	 	}
	 	
	 	
	})
	
	$(document).on('keyup', '.'+changeUnit+'', function () { 
	   var thisVal = $(this).val();
 	   var thisTr = $(this).closest("tr");
 	   //scale
 	   var scaleV = thisTr.find('[name$="scale"]').val();
 	   
 	   //t.getBaseUnitNum()+"-"+t.getTransformUnitNum()+"-"+baseAccuracy+"-"+t.getTransformType() & t.getBaseUnitNum()+"-"+t.getTransformUnitNum()+"-"+baseAccuracy+"-"+t.getTransformType();
 	   //基础单位     换算单位     精度     是否浮动
 	   //scaleV = "1-3-2-0&3-5-2-0&5-7-2-0";
 	   
 	   //几组
 	  var scaleArr = scaleV.split("&");
 	  var obj = $(this);
 	  
 	  scaleArr = unitRatio(obj,scaleArr);
 	   
 	  ////基础单位数量     .basicUnitN
 	  ////库存单位数量     .inventoryUnitN
 	  ////库存辅单位数量     .stockAuxiliaryN
 	  ////生产单位数量     .productionUnitN
 	  var flag;
 	  var basicUnitN;
 	  
 	 //输入单位和基本单位一样上面已经赋值了比例1:1
 	  //但是输入单位和非基本单位一样，不好赋值比例，只能在keyup的时候赋值
 	 var changeUnitUnit = changeUnit.split('N')[0];
 	 changeUnitUnitV = thisTr.find('.'+changeUnitUnit).val();
 	 
 	 var baseName = thisTr.find('.basicUnit');
 	 var baseNameN = thisTr.find('.baseNameN');
 	 var inventoryUnit = thisTr.find('.inventoryUnit');
 	 var inventoryUnitN = thisTr.find('.inventoryUnitN');
 	 var stockAuxiliary = thisTr.find('.stockAuxiliary');
 	 var stockAuxiliaryN = thisTr.find('.stockAuxiliaryN');
 	 var productionUnit = thisTr.find('.productionUnit'); 
 	 var productionUnitN = thisTr.find('.productionUnitN'); 
 	 
 	 if(changeUnitUnitV == baseName.val() && changeUnitUnit!="baseName"){
 		baseNameN.val(thisVal)
 	 }
 	if(changeUnitUnitV == inventoryUnit.val()  && changeUnitUnit!="inventoryUnit"){
 		inventoryUnitN.val(thisVal)
 	 }
 	if(changeUnitUnitV == stockAuxiliary.val()  && changeUnitUnit!="stockAuxiliary"){
 		stockAuxiliaryN.val(thisVal)
 	 }
 	if(changeUnitUnitV == productionUnit.val()  && changeUnitUnit!="productionUnit"){
 		productionUnitN.val(thisVal)
 	 }
 	 
 	 $.each(scaleArr,function(scaleArrI,scaleArrE){
 		  if(scaleArrE.indexOf("-")!=-1 && scaleArrI == changeUnitIndex){
 			  var scaleArrEArr = scaleArrE.split("-");
 			  //基础单位
 			  var proportion1 = scaleArrEArr[0];
 			  //换算单位
 			  var proportion2 = scaleArrEArr[1];
 			  //精度
 	 		  var precision = scaleArrEArr[2];
 	 		  //是否浮动 1是固定2是浮动
 	 		  var isFloat = scaleArrEArr[3];
 	 		  
	 	 	  //获取localStorage精度
	 	 	  var precision=unitPrecision(thisTr.find('.basicUnit').val());
	 	 		  
 	 		  if(precision=="00"){
 	 			basicUnitN = (proportion1 * thisVal / proportion2);
 	 		  }else{
 	 			basicUnitN = (proportion1 * thisVal / proportion2).toFixed(precision);  
 	 		  }
 	 		  
 	 		  if(basicUnitN == "NaN"){
 	 			  
 	 			basicUnitN = "";
 	 		  }
 	 		  thisTr.find(".basicUnitN").val(basicUnitN);
 	 		  if(isFloat==2){
 	 			thisTr.find(".basicUnitN").removeAttr("readonly");
 	 		  }
 	 		 flag = "true";
 		  }
 	  })
 	  if(flag == "true"){
 		 $.each(scaleArr,function(scaleArrI,scaleArrE){
 	 		  if(scaleArrE.indexOf("-")!=-1 && scaleArrI != changeUnitIndex){
 	 			  var scaleArrEArr = scaleArrE.split("-");
 	 			  //基础单位
 	 			  var proportion1 = scaleArrEArr[0];
 	 			  //换算单位
 	 			  var proportion2 = scaleArrEArr[1];
 	 			  //精度
 	 	 		  var precision = scaleArrEArr[2];
 	 	 		  //是否浮动   1是固定2是浮动
 	 	 		  var isFloat = scaleArrEArr[3];
 	 	 		  
 	 	 		  //获取精度
 	 	 		  var precision=unitPrecision(closestObj.find('.'+changeUnit).val());
 	 	 		  
 	 	 		if (scaleArrI == 0 && basicUnitN != undefined) {
 	 	 			if(precision=="00"){
 	 	 				var inventoryUnitN = (proportion2 * basicUnitN / proportion1);
 	 	 			}else{
 	 	 				var inventoryUnitN = (proportion2 * basicUnitN / proportion1).toFixed(precision);
 	 	 			}
 	 	 	        
 	 	 	        thisTr.find(".inventoryUnitN").val(inventoryUnitN);
 	 	 	        if(isFloat==2){
 	 	 	 			thisTr.find(".inventoryUnitN").removeAttr("readonly");
 	 	 	 		  }
 	 	 	    } 
 	 	 	    else if (scaleArrI == 1 && basicUnitN != undefined) {
 	 	 	    	if(precision=="00"){
 	 	 	    		var stockAuxiliaryN = (proportion2 * basicUnitN / proportion1);
 	 	 			}else{
 	 	 				var stockAuxiliaryN = (proportion2 * basicUnitN / proportion1).toFixed(precision);
 	 	 			}
 	 	 	        
 	 	 	        thisTr.find(".stockAuxiliaryN").val(stockAuxiliaryN);
 	 	 	        if(isFloat==2){
 	 	 	 			thisTr.find(".stockAuxiliaryN").removeAttr("readonly");
 	 	 	 		  }
 	 	 	    }
 	 	 	    else if (scaleArrI == 2 && basicUnitN != undefined) {
 	 	 	    	if(precision=="00"){
 	 	 	    		var productionUnitN = (proportion2 * basicUnitN / proportion1);
 	 	 			}else{
 	 	 				var productionUnitN = (proportion2 * basicUnitN / proportion1).toFixed(precision);
 	 	 			}
 	 		        
 	 		        thisTr.find(".productionUnitN").val(productionUnitN);
 	 		        if(isFloat==2){
 	 	 	 			thisTr.find(".productionUnitN").removeAttr("readonly");
 	 	 	 		  }
 	 		    }
 	 		  }
 	 		
 	 	  })
 	  }
 	  
 	  
 	  
 	  
 	  

// 	  var unitCount =( arr2[0]*actualCountValue/arr2[1]).toFixed(JD);
// 	  var assistUnitCountValue = (arr3[1]*unitCount/arr3[0]).toFixed(JD2);
// 	  var isF = arr3[3];
// 	  if(isF == "0"){
// 		  $(this).closest("tr").find('[name$="assistUnitCount"]').removeAttr("readonly");
// 	  }
// 	   $(this).closest("tr").find('[name$="unitCount"]').val(a);
// 	   $(this).closest("tr").find('[name$="assistUnitCount"]').val(b);
    });
}

//general id
function editParm1(){
	var src = top.$("#admin-body iframe:visible").attr("src");
	var parm = (src.split(".html?")[1]).split("/")[1];
	return parm;
}

//detail id
function editParm2(){
	var src = top.$("#admin-body iframe:visible").attr("src");
	var parm = (src.split(".html?")[1]).split("/")[0];
	return parm;
}

//上传附件弹窗上的
//pages/general/uploadAttachment/uploadAttachment.html?406&ProductionWorkOrder&附件
function editParm3(){
	var src = top.$(".layui-layer").eq(0).find("iframe").attr("src");
	var parm = (src.split(".html?")[1]).split("&")[0];
	return parm;
}
function editParm4(){
	var src = top.$(".layui-layer").eq(0).find("iframe").attr("src");
	var parm = (src.split(".html?")[1]).split("&")[1];
	return parm;
}
function editParm5(){
	var src = top.$(".layui-layer").eq(0).find("iframe").attr("src");
	var parm = (src.split(".html?")[1]).split("&")[2];
	return parm;
}

function editBtn(obj,href,text){

	var numnum = top.$('#admin-body iframe:visible').attr('data-index');
	var parm = JSON.parse(localStorage.getItem("dataParmJsonArr"+numnum))[0].mainId; 
	
	href=href+"?"+parm;
	
	var numnum = top.$("li.layui-this:visible").attr("lay-id");
	numnum = numnum + text; 

	if(text == '委外结算新增'){
		localStorage.setItem(numnum, $('[name$="ProductionOutSourcesReceive.qualityQuantity"]').val());
	}
	
	if(text == "生产入库单新增"){
		
    	$.ajax({
    		url: testDomainName + "/api-p/ProductionOutSourcesReceive/dataValidate/"+parm,
    		type: "post",
    		async: false,
    		contentType: "application/text; charset=utf-8",
    		success: function (result) {
    			if(typeof result == "string"){
            		result = JSON.parse(result);	
            	}
    			
    			if (result.header.status != '200') {
    				
    				top.layer.alert(result.header.statusContent,{
    					title: allLanguage.info,
    					btn: [allLanguage.sure]
    				});
    				return false
    			}else{
    				top.$(".tabnewtab").removeAttr("data-url");
    			    top.$(".tabnewtab").removeAttr("lay-id");
    			    top.$(".tabnewtab").attr("data-url", href);
    			    top.$(".tabnewtab").attr("lay-id", numnum);
    			    top.$(".tabnewtab").text(text);
    			    top.$(".tabnewtab").click();
    			}
    			
    		},
    		error: function () {
    			
    		}
    	})
		
	}else{
		top.$(".tabnewtab").removeAttr("data-url");
	    top.$(".tabnewtab").removeAttr("lay-id");
	    top.$(".tabnewtab").attr("data-url", href);
	    top.$(".tabnewtab").attr("lay-id", numnum);
	    top.$(".tabnewtab").text(text);
	    top.$(".tabnewtab").click();
	}
	
}

function openTab(href,text){

	var numnum = top.$("li.layui-this:visible").attr("lay-id");
	numnum = numnum + text; 
	
	top.$(".tabnewtab").removeAttr("data-url");
    top.$(".tabnewtab").removeAttr("lay-id");
    top.$(".tabnewtab").attr("data-url", href);
    top.$(".tabnewtab").attr("lay-id", numnum);
    top.$(".tabnewtab").text(text);
    top.$(".tabnewtab").click();
    
	
}

//单位精度
function localStorageUnitPrecision(){
	$.ajax({
        url: testDomainName + '/api-bd/common1/getBaseUnit',
        type: "get",
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (result) {
        	if(typeof result == "string"){
        		result = JSON.parse(result);	
        	}
        	if(result.header.status==200){
        		var unitPrecisionArr = result.body;
        		localStorage.setItem("unitPrecision", JSON.stringify(unitPrecisionArr));
        	}
        },
        error: function (){
        	
        }
	})
}

//获取localStorage精度
function unitPrecision(unit){
	var unitPrecision = localStorage.getItem('unitPrecision');
	var unitPrecisionJsonArr = JSON.parse(unitPrecision);
	var precision;
	$.each(unitPrecisionJsonArr,function(i,e){
		if(e.unit==unit){
			precision=e.accuracy
		}
	})
	return precision;
}

//渲染精度
function readyUnitPrecision(){
	$('[datatype="'+top.languageInit.allLanguage.number+'"]').each(function(i,e){
		if($(e).val()!=''){
			var associatedUnit = $(e).attr('associatedunit');
			if($(e).closest('td').length!=0){
				var precision = unitPrecision($(e).closest('tr').find('[name$="'+associatedUnit+'"]').val());
				$(e).val(parseFloat($(e).val()).toFixed(precision));
			}
		}
		
	})
}

//渲染事件


//判断有几个点
function namePointerLength(name){
	return name.match(/\./g).length;
}

//判断是行里的还是普通的
function nameType(name,namename){
	var type = '';
	var nameSuffix = name.split('.')[namePointerLength(name)];
	var namenameSuffix = namename.split('.')[namePointerLength(namename)];
	//
	if( $('.layui-input-inline').find('[name$="'+namenameSuffix+'"]').length!=0 ){
		type = 'noTd'
	}else if( $('[name$="'+nameSuffix+'"]').closest('tr').find('[name$="'+namenameSuffix+'"]').length!=0 ){
		type = 'thisTr'
	}else if( $('td').find('[name$="'+namenameSuffix+'"]').length!=0 && namePointerLength(namename)==1){
		//进入这个else if ，说明已经经过了第2个else if ，已经肯定不是thistr
		type = 'otherTr'
	}else if( $('td').find('[name$="'+namenameSuffix+'"]').length!=0 && namePointerLength(namename)==2){
		//进入这个else if ，说明已经经过了第2个else if ，已经肯定不是thistr
		type = 'otherTable'
	}
	
	return type;
	
//	if(pointerLength == 2){
//		type = 'td';
//	}else if(pointerLength == 1){
//		var nameL = name.split('.')[0];
//		var nameR = name.split('.')[1];
//		var thisBody = $('[name$="'+nameR+'"]').closest('body');
//		var thisInput = thisBody.find('[name$="'+nameR+'"]').filter('[name^="'+nameL+'"]');
//		if(thisInput.closest('td').length>0){
//			type = 'td';
//		}else{
//			type = 'noTd';
//		}
//	}
}

//渲染计算
function readyCalculation(name,inputType,json){
	
	console.log(name);
	console.log(inputType);
	console.log(json);
	
	if(name == undefined){
//		name = 'ProductionWorkOrderDetail.ProductionMaterialUse.dInvariableLoss';
		name = 'ProductionWorkOrderDetail.productionQuantity';
	}
	if(json == undefined){
		json = {
 				//'formula':'ProductionOutSourcesAccountDetail.qualityPriceNoTax=ProductionOutSourcesAccountDetail.qualityPriceWithTax/(1+ProductionOutSourcesAccountDetail.taxRate)'
				//需求数量dRequiedQuantity=（（分子dQuantitiesMolecule/分母dQuantitiesDenominator）*生产数量productionQuantity+固定损耗dInvariableLoss）*（1+变动损耗率dInvariableLossPerc）
				'formula':'ProductionWorkOrderDetail.ProductionMaterialUse.dRequiedQuantity=((ProductionWorkOrderDetail.ProductionMaterialUse.dQuantitiesMolecule/ProductionWorkOrderDetail.ProductionMaterialUse.dQuantitiesDenominator)*ProductionWorkOrderDetail.productionQuantity+ProductionWorkOrderDetail.ProductionMaterialUse.dInvariableLoss)*(1+ProductionWorkOrderDetail.ProductionMaterialUse.dInvariableLossPerc)'
 		}
//		json = {
// 				'formula':'ProductionOutSourcesReceive.productionQuantity-ProductionOutSourcesReceive.qualityQuantity',
// 				'trigger':[
// 					{'ProductionOutSourcesReceive.qualityQuantity':'keyup'}
// 				]
// 		}
	}
	
	
	//判断公式里面的name有几个点，然后取后缀
	var suffix = name.split('.')[namePointerLength(name)];
	//区分是行里的还是普通的
	$('[name$="'+suffix+'"]').on('keyup',function(){
		fnfn($(this));
	})
	
	function fnfn(obj){
		// /ig(全文查找、忽略大小写)
		var formula = json.formula.split('=')[1];
		var formulaNew = formula.replace(/[.a-zA-Z]+/ig,
			function (namename) {
			    //判断公式里面的name有几个点，然后取后缀
				var suffix = namename.split('.')[namePointerLength(namename)];
				//区分是行里的还是普通的
				var objType = nameType(name,namename);
				//取值
				if(objType == "noTd"){
					return parseFloat($('.layui-input-inline').find('[name$="'+suffix+'"]').val())
				}else if(objType == "thisTr"){
					return parseFloat(obj.closest('tr').find('[name$="'+suffix+'"]').val())
				}else if(objType == "otherTr"){
					//name是子表，namename是主表
					var tableIndex = obj.closest('.addcopydel').attr('name');
					suffix = tableIndex + '.' + suffix;
					return parseFloat($('[name$="'+suffix+'"]').val())
				}else if(objType == "otherTable"){
					
				}
			}
		);
		//eval计算值
		var calcNum = eval(formulaNew);
		
		var resultName = json.formula.split('=')[0];
		//name有几个点，然后取后缀
		var resultNameSuffix = resultName.split('.')[namePointerLength(resultName)];
		//区分是行里的还是普通的
		var objType = nameType(name,resultName);
		//赋值
		if(objType == "noTd"){
			$('.layui-input-inline').find('[name$="'+resultNameSuffix+'"]').val(calcNum);
		}else if(objType == "thisTr"){
			obj.closest('tr').find('[name$="'+resultNameSuffix+'"]').val(calcNum);
		}else if(objType == "otherTr"){
			//name是子表，namename是主表
			var tableIndex = obj.closest('.addcopydel').attr('name');
			resultNameSuffix = tableIndex + '.' + resultNameSuffix;
			$('[name$="'+resultNameSuffix+'"]').val(calcNum);
		}
		
	}
	
}

//按钮的初始化
//add by yp
function  pageButtonInit(type,btn){
	return false;
	//新增时按钮
	if(type == "add"){
		$(".opeBtn button").each(function(i,e){
			var text = $(this).html();
			if((text== copy || text == top.languageInit.allLanguage.change || text == top.languageInit.allLanguage.withdraw ||
			text == top.languageInit.allLanguage.audit || text == top.languageInit.allLanguage.unaudit ||text == top.languageInit.allLanguage.enable	||
			text == disable || text == deleted || text == top.languageInit.allLanguage.submit) &&  $.inArray(text, btn) <0){
				jQuery(this).toggleClass("layui-btn-disabled");
				$(this).css("background-color","#aba2a2d4");
				$(this).attr("disabled","disabled");
			}			
		});
	}
	//列表时按钮
	if(type == "modify"){
		$(".opeBtn button").each(function(i,e){
			var text = $(this).html();
			if((text== copy || text == top.languageInit.allLanguage.change || text ==  top.languageInit.allLanguage.withdraw ||
			text == top.languageInit.allLanguage.audit || text == top.languageInit.allLanguage.unaudit || text == top.languageInit.allLanguage.enable	||
			text == disable || text == deleted) &&  $.inArray(text, btn) <0){
				jQuery(this).toggleClass("layui-btn-disabled");
				$(this).css("background-color","#aba2a2d4");
				$(this).attr("disabled","disabled");
			}			
		});
	}
}

//所有disabled 全部加revertDisabled
function revertDisabled(){
	$("input:disabled").addClass("revertDisabled");
	$("select:disabled").addClass("revertDisabled");
}

//输入页码，输入范围外的页码，提示报错    . ui-pg-input(页码输入框)     #sp_1_pager(共几页)     .ui-pg-selbox(选中页码select)
function enterPageNumber(){
//	$(document).on('keyup', '.ui-pg-input', function () {	
//		if(event.keyCode=='13'){
//			if(parseInt($(this).val()) > parseInt($("#sp_1_pager:visible").text())){
//				top.layer.alert('你输入的页码不存在，请重新输入！');
//				$(".ui-pg-selbox:visible").attr("disabled","");
//			}
//			else{
//				$(".ui-pg-selbox:visible").removeAttr("disabled");
//			}
//			}
//		})
}

//function printData(){
//	$(document).on('click', '.printData', function () {
//		$(".dataPrint").jqprint({
//		     /* debug: true, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
//		     importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
//		     printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
//		     operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true */
//		});
//	})
//	
//}

function tableOpe(addProUrl,delProUrl){
	//删除方案
	$(document).on('click', '#delPro', function () {
		var ValV = $(".ui-template").val();
		if(ValV==top.languageInit.allLanguage.defaultPlan){
			top.layer.msg(top.languageInit.allLanguage.programNoDelete)
			return false
		}
		var thisOption = $(".ui-template option[value="+ValV+"]");
		var isDefault = thisOption.attr("isDefault");
		var tip="";
		if(isDefault==1){
			tip = top.languageInit.allLanguage.thisProgramIsDefaultProgram+','
		}
		
		top.layer.alert(''+tip+top.languageInit.allLanguage.sureDeleteprogram, function(index){
			  //do something
			
			var nameT = thisOption.text().replace(top.languageInit.allLanguage.default1,"");
			
			//var url = testDomainName + '/api-p/common1/deleteSearch/ProductionFlowCardKey/' + nameT;
			var url = delProUrl + nameT;
			
			$.ajax({
		        type: 'post',
		        url: url,
		        contentType: "application/text; charset=utf-8",
		        async: false,
		        success: function (data) {
		        	//data = "{"header":{"status":"200","statusContent":top.languageInit.allLanguage.success},"body":5}"
		        	top.layer.msg(top.languageInit.allLanguage.deleteSuccess+"！");
					var iframeSrc = top.$("iframe:visible").attr("src").split("?")[0];
					top.$("iframe:visible").attr("src",""+iframeSrc+"?name="+top.languageInit.allLanguage.defaultPlan+"&nameVal="+top.languageInit.allLanguage.defaultPlan);
		        }
		    })  
			
			  top.layer.close(index);
			});
		
		
	})
	//点击设为默认setAsDefault
	$(document).on('click', '#setAsDefault', function () {
		var ValV = $(".ui-template").val();
		if(ValV==top.languageInit.allLanguage.defaultPlan){
			top.layer.alert(top.languageInit.allLanguage.defaultPlanCannot,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

			return false
		}
		$(".ui-template option").attr("isDefault","0");
		var nameT = $(".ui-template option[value="+ValV+"]").text();
		$(".ui-template option[value="+ValV+"]").attr("isDefault","1");
		$("#fbox_list_template").trigger('click',["setAsDefault"]);
		//top.layer.msg("已将方案"+nameT+"保存为默认方案！")
	})
	//点击保存方案
	$(document).on('click', '#fbox_list_template', function (event,string) {
		var ValV = $(".ui-template").val();
		if(ValV == top.languageInit.allLanguage.defaultPlan){//如果是default，保存为新增方案
			//最多3个
			if($(".ui-template option").length>3){
				top.layer.alert(top.languageInit.allLanguage.onlyTreeTemplatesAllowed,{
					btn: [top.languageInit.allLanguage.sure],
					title: top.languageInit.allLanguage.info
				});
				return false
			}
		}
		if($("button[filterval]").length>0){
			var tableFilterJsonArr = JSON.parse($("button[filterval]").attr("filterval"));
		}else{
			var tableFilterJsonArr = JSON.parse(parent.$("button[filterval]").attr("filterval"));
		}
		
		
		var sumJson = {
			"tableProgram":{},
			"tableFilter":tableFilterJsonArr,
			"tableProperty":""
		};
		
		//console.log(JSON.stringify(tableConfigJson));

		//tableProgram
		
		var thisOption = $(".ui-template option[value="+ValV+"]");
		var nameT = thisOption.text().replace(top.languageInit.allLanguage.default1,"");
		var cusId = thisOption.attr("cusId");
		var isDefault = thisOption.attr("isDefault");
		
		var groupOpV = $(".opsel").val();

		if(ValV == top.languageInit.allLanguage.defaultPlan){//如果是default，保存为新增方案
			top.layer.prompt(
					{
						title: top.languageInit.allLanguage.newProgramName,
						btn: [top.languageInit.allLanguage.sure,top.languageInit.allLanguage.cancelSet],
						formType: 0
					},
					function(pass, index) {
						nameT = pass;
						top.layer.close(index);
						program();
						
					});
		}else{//如果不是default，保存为替换方案
			program();
		}
		
		function program() {
			
			var reg = /\.(\w+)\s/g;
			//查找带回的$(".query").text()会忽略查找带回的值，所以要把ts.p.postData.filters 重新生成$(".query").text()
			var SQLStr = $(".query").text();
			var matchArr = SQLStr.match(reg);
			if(matchArr != null){
				$.each(matchArr,function(matchArrI,matchArrE){
					//replace不能变量 需要用RegExp
					var matchArrEOld  = matchArrE;
					var matchArrENew = matchArrE.replace(/([A-Z]+)/g,function($1){return "_" + $1.toLocaleLowerCase()});
					SQLStr = SQLStr.replace(new RegExp(matchArrEOld,'g'),matchArrENew);
				})
			}
			
			sumJson.tableProgram = {
		            "id": cusId,
		            "name": nameT,
		            "isDefault": isDefault,
		            "contant": {
		                "groupOp": groupOpV,
		                "rules": []
		            },
		            "contantSql":SQLStr
		     };
			
			
			
		    $(".searchLi").each(function (searchLiI, searchLiE) {
		        //.columns select
		        var columnsV = $(searchLiE).find(".columns select").val();
		        //.operators select .selectopts
		        var operatorsV = $(searchLiE).find(".operators select").val();
		        //.data input
		        var dataV = $(searchLiE).find(".data .input-elm").val();
		        
		        var rulesJson = {
		                "field": columnsV,
		                "op": operatorsV,
		                "data": dataV
		         }
		        
		        sumJson.tableProgram.contant.rules.push(rulesJson);
		    })


		    //tableProperty  
		    var tableProperty = "";
		    var count = 0;
		    $(".ui-jqgrid-htable thead th:visible").each(function (i, e) {
		        var propertyId = $(e).attr("propertyId");
		        if (propertyId != "undefined") {
		            if (count == 0) {
		                tableProperty = tableProperty + propertyId;
		            } else {
		                tableProperty = tableProperty + "," + propertyId;
		            }
		            count++;
		        }

		    })
		    sumJson.tableProperty = tableProperty;

		    console.log(sumJson)


		    $.ajax({
		        type: 'post',
		        url: addProUrl,
		        contentType: "application/text; charset=utf-8",
		        async: false,
		        data: JSON.stringify(sumJson),
		        success: function (data) {
		        	//data = "{"header":{"status":"200","statusContent":top.languageInit.allLanguage.success},"body":5}"
		        	//data = $.parseJSON(data);
		        	top.layer.msg(top.languageInit.allLanguage.planSavedSuccessfully);
		        	var iframeSrc = top.$("iframe:visible").attr("src");

		        	if(ValV == top.languageInit.allLanguage.defaultPlan){
		        		//新建新方案
		        		var nameVal = Number($(".ui-template option").length)-1;
						
						if(iframeSrc.indexOf("treesearch.html")!=-1){
							//top.$("iframe:visible").attr("src",iframeSrc);
//							iframeSrc = top.$("iframe:visible").contents().find("iframe:visible").attr("src").split("&")[0];
//							top.$("iframe:visible").contents().find("iframe:visible").attr("src",""+iframeSrc+"&name="+nameT+"&nameVal="+nameVal+"");
						
							if(iframeSrc.indexOf("pid")!=-1){
								iframeSrc = top.$("iframe:visible").contents().find("iframe:visible").attr("src").split("&")[0];
								top.$("iframe:visible").contents().find("iframe:visible").attr("src",""+iframeSrc+"&name="+nameT+"&nameVal="+nameVal+"");
							}else{
								iframeSrc = top.$("iframe:visible").contents().find("iframe:visible").attr("src").split("?")[0];
								top.$("iframe:visible").contents().find("iframe:visible").attr("src",""+iframeSrc+"?name="+nameT+"&nameVal="+nameVal+"");
							}
							
						}else{
							iframeSrc = top.$("iframe:visible").attr("src").split("?")[0];
							top.$("iframe:visible").attr("src",""+iframeSrc+"?name="+nameT+"&nameVal="+nameVal+"");
						}
		        	}
		        	if(string!=undefined){
		        		//设为默然，重载页面
		        		top.$("iframe:visible").attr("src",""+iframeSrc+"");
		        	}
		        }
		    })

		}
		
		
		
	})
}

////委外核算金额计算
////不含税单价=含税单价/（1+税率）；
////含税金额=含税单价*数量  （多个相加）；
////税额=不含税单价*税率*数量  （多个相加）；
function  calculateOutSourcePrice(){
	function calculateOutSourcePriceS(obj){
		
		var closestObj = obj.closest("tr");
		
		//税率
		var taxRate = closestObj.find('[name$="taxRate"]').val();
		if(taxRate.indexOf('%')!=-1){
			taxRate = parseFloat(taxRate)*0.01
		}
		
		//含税合格单价
		var qualityPriceWithTax = closestObj.find('[name$="qualityPriceWithTax"]').val();
		//工废含税单价
		var industrialWastePriceWithTax = closestObj.find('[name$="industrialWastePriceWithTax"]').val();
		//废料含税单价
		var materialWastePriceWithTax = closestObj.find('[name$="materialWastePriceWithTax"]').val();
		
		//计价合格数量
		var priceQualityQuantity = closestObj.find('[name$="priceQualityQuantity"]').val();
		//计价工废数量
		var priceIndustrialWasteQuantity = closestObj.find('[name$="priceIndustrialWasteQuantity"]').val();
		//计价料废数量
		var priceMaterialWasteQuantity = closestObj.find('[name$="priceMaterialWasteQuantity"]').val();
		
		//判断不能是负数
		if( obj.val()=='' || obj.val()==' ' || isNaN(obj.val()) ){
			top.layer.alert(top.languageInit.allLanguage.enterPositiveNumber+'！',{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
			obj.val('');
			return false	
		}
		
		//计价合格数量 不能大于 委外收回修改页面的合格数量		
		if( parseFloat(priceQualityQuantity) > parseFloat(localStorage.getItem(top.$("#admin-body iframe:visible").attr("data-index"))) ){
			top.layer.alert(top.languageInit.allLanguage.qualifiedNumberLimit+'！',{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
			obj.val('');
			return false	
		}
		
		//设定默认值
		taxRate = taxRate=="" ? 0 : taxRate;
		qualityPriceWithTax = qualityPriceWithTax=="" ? 0 : qualityPriceWithTax;
		industrialWastePriceWithTax = industrialWastePriceWithTax=="" ? 0 : industrialWastePriceWithTax;
		materialWastePriceWithTax = materialWastePriceWithTax=="" ? 0 : materialWastePriceWithTax;
		priceQualityQuantity = priceQualityQuantity=="" ? 0 : priceQualityQuantity;
		priceIndustrialWasteQuantity = priceIndustrialWasteQuantity=="" ? 0 : priceIndustrialWasteQuantity;
		priceMaterialWasteQuantity = priceMaterialWasteQuantity=="" ? 0 : priceMaterialWasteQuantity;
		
		//合格单价
		var qualityPriceNoTax = closestObj.find('[name$="qualityPriceNoTax"]');
		//工废单价
		var industrialWastePriceNoTax = closestObj.find('[name$="industrialWastePriceNoTax"]');
		//料废单价
		var materialWastePriceNoTax = closestObj.find('[name$="materialWastePriceNoTax"]');
		
		//含税金额
		var amountWithTax = closestObj.find('[name$="amountWithTax"]');
		//金额
		var amountNoTax = closestObj.find('[name$="amountNoTax"]');
		//税额
		var taxAmount = closestObj.find('[name$="taxAmount"]');
		
		//精度取值
		var precision=unitPrecision(closestObj.find('[name$="priceUnit"]').val());
		
		//不含税单价计算赋值    含税单价/(1+税率)
		qualityPriceNoTax.val((qualityPriceWithTax/(1+ parseFloat(taxRate))).toFixed(precision));
		industrialWastePriceNoTax.val((industrialWastePriceWithTax/(1+ parseFloat(taxRate))).toFixed(precision));
		materialWastePriceNoTax.val((materialWastePriceWithTax/(1+ parseFloat(taxRate))).toFixed(precision));
		
		//含税金额赋值    合格含税金额+工废含税金额+废料含税金额
		amountWithTax.val((parseFloat(qualityPriceWithTax*priceQualityQuantity)+parseFloat(industrialWastePriceWithTax*priceIndustrialWasteQuantity)+parseFloat(materialWastePriceWithTax*priceMaterialWasteQuantity)).toFixed(precision));
		
		//税额赋值  合格不含税单价*税率*数量+工废不含税单价*税率*数量+废料不含税单价*税率*数量
		taxAmount.val((parseFloat(qualityPriceNoTax.val()*taxRate*priceQualityQuantity)+parseFloat(industrialWastePriceNoTax.val()*taxRate*priceIndustrialWasteQuantity)+parseFloat(materialWastePriceNoTax.val()*taxRate*priceMaterialWasteQuantity)).toFixed(precision));

		//金额赋值
		amountNoTax.val((parseFloat(amountWithTax.val())-parseFloat(taxAmount.val())).toFixed(precision));
	}
	
	$(document).on('keyup', '[name$="priceQualityQuantity"], [name$="priceIndustrialWasteQuantity"], [name$="priceMaterialWasteQuantity"],[name$="qualityPriceWithTax"],[name$="industrialWastePriceWithTax"],[name$="materialWastePriceWithTax"],[name$="taxRate"]', function () {
		calculateOutSourcePriceS($(this));
		//财务信息计算
        financialInformation();
	})
}

//财务信息     委外收回   修改   委外结算   财务信息
function financialInformation(){
	//税额合计ProductionOutSourcesAccountGeneral.totalTax           ProductionOutSourcesAccountDetail[0].taxAmount
	//金额合计ProductionOutSourcesAccountGeneral.totalAmountNoTax   ProductionOutSourcesAccountDetail[0].amountNoTax
	//价税合计ProductionOutSourcesAccountGeneral.totalAmount        ProductionOutSourcesAccountDetail[0].amountWithTax
	var totalTaxVal=0,totalAmountNoTaxVal=0,totalAmountVal=0;
	$(".addedit tbody tr").each(function(i,e){
		var taxAmountVal = $(e).find('[name$="taxAmount"]').val();
		var amountNoTaxVal = $(e).find('[name$="amountNoTax"]').val();
		var amountWithTaxVal = $(e).find('[name$="amountWithTax"]').val();
		
		totalTaxVal+=parseFloat(taxAmountVal);
		totalAmountNoTaxVal+=parseFloat(amountNoTaxVal);
		totalAmountVal+=parseFloat(amountWithTaxVal);
	})
	$('[name="ProductionOutSourcesAccountGeneral.totalTax"]').val(totalTaxVal);
	$('[name="ProductionOutSourcesAccountGeneral.totalAmountNoTax"]').val(totalAmountNoTaxVal);
	$('[name="ProductionOutSourcesAccountGeneral.totalAmount"]').val(totalAmountVal);
}

//“检验不良数”应该大于“不良数量”；badQuantity()
//QualityNoGoodCheckDeatil[0].checkNoGoodNum检验不良数
//QualityNoGoodCheckDeatil[0].noQualifiedNum不良数量
function badQuantity(){
	$(document).on('keyup', '[name$="checkNoGoodNum"], [name$="noQualifiedNum"]', function () {
		var checkNoGoodNumVal = $(this).closest("tr").find('[name$="checkNoGoodNum"]').val();
		var noQualifiedNumVal = $(this).closest("tr").find('[name$="noQualifiedNum"]').val();
		if(parseFloat(checkNoGoodNumVal)<parseFloat(noQualifiedNumVal)){
			top.layer.alert(top.languageInit.allLanguage.badTestsLessThanBad,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

			$(this).val("");
		}
	})
}

//检验单新增   抽样数量   明细信息（检验数量）  检验信息（抽样方案）
function samplingQuantity(){
	//QcCheckDeatil[0].checkNum 检验数量
	$(document).on('keyup', '[name$="checkNum"]', function () {
		//QcCheckDeatil[0].qualityInspectionPlan
		if($(this).closest("tr").find('[name$="qualityInspectionPlan"]').val()==""){
			return false
		}
		//是什么东西触发了事件
		var who = "input";
		//使用的是什么方法，keyup还是change
		var fun = "keyup";
		samplingScheme($(this),who,fun);
	})
	//因为要比对input的值跟上下限的大小，所以只能change
	$(document).on('change', '[name$="checkNum"]', function () {
		//QcCheckDeatil[0].qualityInspectionPlan
		if($(this).closest("tr").find('[name$="qualityInspectionPlan"]').val()==""){
			return false
		}
		var who = "input";
		samplingScheme($(this),who);
	})
}

//抽样方案
function samplingScheme(obj,who,fun){
	var checkNumVal = obj.val();
	if(checkNumVal==""){
		return false
	}
	var trIndex = obj.closest("tr").index();
	//检验信息tab里面对应的addcopydel
	var addcopydel = top.$("#admin-body iframe:visible").contents().find('.custabcons[tab="'+top.languageInit.allLanguage.checkInfo+'"]').find('.addcopydel').eq(trIndex);
	
	var msg='';
	addcopydel.find("table tbody tr").each(function(tri,tre){
		//QcCheckDeatil[0].QcCheckInfo[0].spType 抽样类型
		//QcCheckDeatil[0].QcCheckInfo[0].sampleAmount 抽样数量
		////<option value="0">全检</option><option value="1">固定数量</option><option value="2">按百分比抽样</option><option value="3">自定义抽样</option>
		var spTypeVal = $(tre).find('[name$="spType"]').val();
		var sampleAmountVal = $(tre).find('[name$="sampleAmount"]').val();
		if(spTypeVal!=1 && spTypeVal!=3){
			if(spTypeVal==0){
				//全检
				$(tre).find('[name$="samplingNum"]').val(checkNumVal);
				$(tre).find('[name$="samplingNum"]').attr("value",checkNumVal);
			}else if(spTypeVal==2){
				//百分百
				//QcCheckDeatil[0].QcCheckInfo[0].spBatchUp
				//QcCheckDeatil[0].QcCheckInfo[0].spBatchDown
				var spBatchUpVal = $(tre).find('[name$="spBatchUp"]').val();
				var spBatchDownVal = $(tre).find('[name$="spBatchDown"]').val();
				//判断检验数量在不在 范围里面
				if(parseInt(checkNumVal)>=parseInt(spBatchDownVal) && parseInt(checkNumVal)<=parseInt(spBatchUpVal)){
					sampleAmountVal = parseInt(sampleAmountVal)*0.01;
					$(tre).find('[name$="samplingNum"]').val(checkNumVal*sampleAmountVal);
					$(tre).find('[name$="samplingNum"]').attr("value",checkNumVal*sampleAmountVal);
				}else if(fun != "keyup"){
					
					if(who == "input" ){
						msg+=top.languageInit.allLanguage.testNumberInfo+(tri+1)+top.languageInit.allLanguage.samplingUpperAndLowerLimitNum+"<br/>";
						obj.val('');
					}else if(who == "back" ){
						msg+=top.languageInit.allLanguage.testNumberInfo+(tri+1)+top.languageInit.allLanguage.samplingUpperAndLowerLimitPlan+"<br/>";
						//QcCheckDeatil[0].QcCheckInfo[0].samplingPlan 抽样方案
						$(tre).find('[name$="samplingPlan"]').val('');
					}					
				}	
			}		
		}else{
			//QcCheckDeatil[0].QcCheckInfo[0].samplingNum
			$(tre).find('[name$="samplingNum"]').val(sampleAmountVal);
			$(tre).find('[name$="samplingNum"]').attr("value",sampleAmountVal);
		}
	})
	if(msg!=''){
		top.layer.alert(msg,{
			btn: [top.languageInit.allLanguage.sure],
			title: top.languageInit.allLanguage.info
		});
	}
	
}

//仓库新增 是否启用仓位 控制下面的表格是否显示
////BaseWarehouseGeneral.positionStatus
function positionStatus(){
	function positionStatusS(obj){
		if(obj.val()==1){
			$('.addcopydel').show();
		}else{
			$('.addcopydel').hide();
		}
	}
	$(document).on('change', '[name$="positionStatus"]', function () {
		positionStatusS($(this))
	})
	if($('[name$="positionStatus"]').length>0){
		var obj = $('[name$="positionStatus"]');
		positionStatusS(obj)
	} 
	
}



//单据日期默认 当前日期
function thisDate(){
	if(window.frameElement.src.indexOf('add.html')!=-1 || window.frameElement.src.indexOf('copy.html')!=-1){
		var day2 = new Date();
		//day2.setTime(day2.getTime());
		var month = (day2.getMonth()+1) < 10 ? '0'+(day2.getMonth()+1) : (day2.getMonth()+1);
		var date = day2.getDate() < 10 ? '0'+day2.getDate() : day2.getDate();
		var s2 = day2.getFullYear()+"-" + month + "-" + date;
		$('[name$=".docDate"]').val(s2);
		$('[name$=".billDate"]').val(s2);	
	}
	
}

//其它入库单新增     是否启用批号为否时，批号可以手输，需要验证
function batchNumberCheck(){
	//ProductionOtherInOrderDetail[0].batchNumber
	$(document).on('change', '[name$=".batchNumber"]', function () {
		var batchNumberVal = $(this).val();
		if(batchNumberVal == ''){
			return false
		}
		var thisInput = $(this);
		var batchNumberUrl = testDomainName + '/api-p/ProductionBatchNumberMainFile/checkBatchNumber/'+batchNumberVal;
		
		$.ajax({
	        url: batchNumberUrl,
	        type: "post",
	        dataType: 'json',
	        contentType: 'application/json',
	        async: false,
	        success: function (data) {
	        	if(typeof data == "string"){
                	data = JSON.parse(data);
	        	}
	            if(data.header.status == '608'){
	            	top.layer.alert(data.header.statusContent,{
	    				btn: [top.languageInit.allLanguage.sure],
	    				title: top.languageInit.allLanguage.info
	    			});
	            	thisInput.val('');
	            }
	        },
	        error: function () {
	            alert(top.languageInit.allLanguage.occerFail);
	        }
		});
	})
	
}

//委外收回 新增修改 生产数量-合格数量=不合格数量
////ProductionOutSourcesReceive.productionQuantity ProductionOutSourcesReceive.qualityQuantity ProductionOutSourcesReceive.unQualityQuantity
////custabcons

//2020/1/2 新添加字段实收数量，取消原先判断逻辑，只需判断实收数量不大于工序数量
function receiveQuantity(){
	$(document).on('keyup', '[name$=".receiveQuantity"]', function () {

		if( $(this).val()=='' || $(this).val()==' ' || isNaN($(this).val()) ){
			top.layer.alert(top.languageInit.allLanguage.enterPositiveNumber+'！',{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});
			$(this).val('');
			return false	
		}
		
		var productionQuantityVal = $(this).closest('.custabcons').find('[name$="productionQuantity"]').val();
		var receiveQuantity = $(this).val();
		var checkVal = parseFloat(productionQuantityVal) - parseFloat(receiveQuantity);
		
		if(checkVal<0){
			top.layer.alert(top.languageInit.allLanguage.receiveQuantityCannotGreaterThanProductionQuantity,{
				btn: [top.languageInit.allLanguage.sure],
				title: top.languageInit.allLanguage.info
			});

			$(this).val('');
			return false
		}
	})
}

//静态页面，明细信息第一行选中
function firstTrSelect(){
	if($('.custabcons[tab="'+top.languageInit.allLanguage.detailInfo+'"]').length>0 || $('.custabcons[tab="'+top.languageInit.allLanguage.processList+'"]').length>0){
		if($('.custabtits[tab="'+top.languageInit.allLanguage.detailInfo+'"]').closest('.custabtit').find('.custabtits:visible').length>1){
			$('.custabcons[tab="'+top.languageInit.allLanguage.detailInfo+'"] table tbody tr:first-child .aedbtns').attr('checked',true);
		}
		if($('.custabtits[tab="'+top.languageInit.allLanguage.processList+'"]').closest('.custabtit').find('.custabtits:visible').length>1){
		}
	}
}

//localStorage 取pagekey 和text 
//取layid
function pagekeyText(){
	
	var index = top.$("#admin-body iframe:visible").attr("data-index");
	if(top.$('.layui-layer:visible').length!=0){
		index = top.$('.layui-layer:visible iframe').parent().attr("id");
	}
	
	var dataParmJsonArr = "dataParmJsonArr"+index;
	return dataParmJsonArr;
}

//新增頁面新增按钮清空数据
function addPageAdd(){
	//location.href='add.html';
	var src = top.$("#admin-body iframe:visible").attr('src');
	var srcHref = src.split('?')[0];
	top.$("#admin-body iframe:visible").attr('src',srcHref);
}

//back.html backkey filtername     backKey=maGroup&filterName=MaGroup
function backPageParm(){
	
	var src = window.frameElement.src;
	var srcParm = src.substring(src.lastIndexOf("?")+1);
	var arr = srcParm.split("&");
	
	var backKey="";
	var jsonStr={};
	if(arr.length==1){
		backKey = arr[0];
	}else{
		var arrel="";
		var arrer="";
		$.each(arr,function(i,e){
			if(e.split("=")[0]=="backKey"){
				backKey = e.split("=")[1]
			}else{
				arrel=e.split("=")[0];
				arrer=e.split("=")[1];
				jsonStr[arrel]=arrer;
			}
		})
	}
	
	var backParm = {
		'backKey':backKey,
		'jsonStr':jsonStr
	}
	
	return backParm
	
}

//静态页面树赋值到新增页面
function staticTreeVal(obj){
	obj.val(localStorage.getItem(pagekeyText().replace('dataParmJsonArr','treeName')));
}

//物料
////是否批次管理选择否，批号编码规则一栏应该置灰不可以选择；选择是，批号编码规则一栏才可以选择
////是否批次管理     BMaterial.isBath 1是 0否
////批号编码规则     BMaterial.batchRuleName
function isBath(){
	function isBathS(){
		var batchRuleName = $('[name$=".batchRuleName"]');
		if( $('select[name$=".isBath"]').val()==0 ){
			batchRuleName.next('.back').hide();
			//edit-inline 是在别的js渲染上去的，所以要稍微延后点
			setTimeout(function(){
				batchRuleName.closest('.layui-inline').removeClass('edit-inline');	
			},0)
		}else if( $('select[name$=".isBath"]').val()==1 ){
			batchRuleName.next('.back').show();
			//edit-inline 是在别的js渲染上去的，所以要稍微延后点
			setTimeout(function(){
				batchRuleName.closest('.layui-inline').addClass('edit-inline');
			},0)
		}
	}
	//修改页面 渲染时
	if( $('select[name$=".isBath"]').length>0 ){
		isBathS();
	}
	//点击时
	$(document).on('change', 'select[name$=".isBath"]', function () {
		isBathS();
	})
}

//物料
////是否序列号管理选择否，序列号编码规则一栏应该置灰不可以选择；选择是，序列号编码规则一栏才可以选择
////是否序列号管理   BMaterial.isSn 1是 0否
////序列号编码规则   BMaterial.snRuleName
function isSn(){
	function isSnS(){
		var snRuleName = $('[name$=".snRuleName"]');
		if( $('select[name$=".isSn"]').val()==0 ){
			snRuleName.next('.back').hide();
			//edit-inline 是在别的js渲染上去的，所以要稍微延后点
			setTimeout(function(){
				snRuleName.closest('.layui-inline').removeClass('edit-inline');	
			},0)
		}else if( $('select[name$=".isSn"]').val()==1 ){
			snRuleName.next('.back').show();
			//edit-inline 是在别的js渲染上去的，所以要稍微延后点
			setTimeout(function(){
				snRuleName.closest('.layui-inline').addClass('edit-inline');
			},0)
		}
	}
	//修改页面 渲染时
	if( $('select[name$=".isSn"]').length>0 ){
		isSnS();
	}
	//点击时
	$(document).on('change', 'select[name$=".isSn"]', function () {
		isSnS();
	})
}

//动态页面 员工 保存时校验ic卡
function isOnlyIc(){
	var src = window.frameElement.src;
	var flag = true;
	if( src.indexOf('/staff/')!=-1 ){
		icCheckParams = {
				'cardNum':$('[name="BaseStaff.cardNum"]').val(),
				     'id':$('[name="BaseStaff.id"]').val()
		}
		$.ajax({
            type: 'post',
            url: testDomainName+ '/api-bd/BaseStaff/checkIC',
            contentType: 'application/text; charset=utf-8',
            async: false,
            data: JSON.stringify(icCheckParams),
            success: function (result) {
            	if(typeof result == "string"){
            		result = JSON.parse(result);
                }
                if(result.header.status != '200'){
                	top.layer.alert(result.header.statusContent);
                	flag = false;
                }
            },
        });
	}
	return flag	
}

//保存是，检验是否有流水号5（批号序列化）
function isSerialNumber(){
	var src = window.frameElement.src;
	if( src.indexOf('/otherCodeRule/')!=-1 ){
		var arr = [];
		$('table.addedit tbody tr').each(function(i,e){
			arr.push($(e).find('[name$=".type"]').val());
		})
		if( !arr.some( key => key==5 ) ){
			top.layer.alert('必须包含流水号！')
			return false
		}else{
			return true
		};
	}
}

/*==================================================*/
$(document).ready(function () {
	//jqg_list_
//	$(document).on('click','[name^=jqg_list_]',function(){
//		if($(this).is(":checked")){
//			$(this).closest("tr").siblings().find('[name^=jqg_list_]').removeAttr("checked");
//			$(this).closest("tr").siblings().removeClass("ui-state-highlight").removeAttr("aria-selected");
//		}
//	})
	

	
	//初始化页面上datepicker的默认值 静态页面
	var datepickerObj = $(document);
	datepickerDefaultValueObj(datepickerObj);
	
	//去除页面上的<i class="fa fa-calendar"></i>
	//$(".fa-calendar").remove();
	
	//dateTime
	cusdatetimepicker();
	
	
	//单位精度
	localStorageUnitPrecision();
		
	//班次 工作小时数
	cusTimeSheet();
	
    //backClick
	backClick();

    //cusTab
    cusTab();
    
    //只能选中一行
    onlyTr()
    
    //新增行复制行
    addCopyRow();
    
    //新增行
    //addrow();

    //复制行
    //copyrow();

    //删除行
    delrow();
    
    //多级菜单
    menulevel();
    
    //生效日期 失效日期
    effExpDate();
    
    //开始时间 结束时间 表格里面
    startEndDate();
    
    //addEditDelJsplumb
    addEditDelJsplumb();

	//implementation 查看流转卡执行情况
    implementation();
	
    
    
    //jqgrid 展开表格
    zkbg();
    
    //所有disabled 全部加revertDisabled
    revertDisabled();
    
    
    //输入页码，输入范围外的页码，提示报错    . ui-pg-input     #sp_1_pager
    enterPageNumber();
    
    dateCheck();
    
    //委外结算计算调用
    calculateOutSourcePrice();
    
    //“检验不良数”应该大于“不良数量”；
    badQuantity();
    
    //检验单新增   抽样数量   明细信息（检验数量）  检验信息（抽样方案）
    samplingQuantity();
    
  //仓库新增 是否启用仓位 控制下面的表格是否显示
    ////BaseWarehouseGeneral.positionStatus
    positionStatus();
    
  //单据日期默认 当前日期
    thisDate();

  //其它入库单新增     是否启用批号为否时，批号可以手输，需要验证
    batchNumberCheck();
    
    //委外收回 新增修改 生产数量-合格数量=不合格数量
    ////ProductionOutSourcesReceive.productionQuantity ProductionOutSourcesReceive.qualityQuantity ProductionOutSourcesReceive.unQualityQuantity
    ////custabcons
    //2020/1/2 新添加字段实收数量，取消原先判断逻辑，只需判断实收数量不大于工序数量
	receiveQuantity();
    
	//静态页面，明细信息第一行选中
	//firstTrSelect();
	
	//add edit 页面 formAllBtn()
	if( ( parent.$('iframe:visible').attr('src').indexOf('/add.html')!=-1 ||
		  parent.$('iframe:visible').attr('src').indexOf('/edit.html')!=-1 || 
		  parent.$('iframe:visible').attr('src').indexOf('/copy.html')!=-1 ) && 
		$('.opeBtn').length>0 ){
		
			$('.opeBtn').attr("id","opeBtn");
			formAllBtn();
			
			
			
			var src = window.frameElement.src;
			var url = src.match(/pages.+/)[0];
			var urlParam = (auditApiGet(url));
		    
			$(document).on('click','.addform, .copyform',function(){
				var src = window.frameElement.src;
				if( (src.indexOf('/add.html')!=-1 && $(this).hasClass('addform')) || (src.indexOf('/copy.html')!=-1 && $(this).hasClass('copyform')) ){
					top.layer.confirm('是否要删除输入数据？', {
						  btn: [top.languageInit.allLanguage.sure, top.languageInit.allLanguage.cancelSet], // 可以无限个按钮
						  title: top.languageInit.allLanguage.info
						}, 
						function(index, layero){
							window.location.reload();
							top.layer.close(index);
						}, 
						function(index, layero){
						  
						});
				}else{
					if( $(this).hasClass('addform') ){
						var page = 'add.html';
						var newTitle = allLanguage.add;
					}else{
						var page = 'copy.html';
						var newTitle = allLanguage.copy;
					}
					var src = top.$("#admin-body iframe:visible").attr("src");
					var newSrc = src.substring(0, src.lastIndexOf("/") + 1)+page;
					var title = top.$('.layui-tab-title .layui-this cite').text();
					var suffix = title.indexOf(allLanguage.add)!=-1 ? allLanguage.add : title.indexOf(allLanguage.update)!=-1 ? allLanguage.update : allLanguage.copy;
					newTitle = title.split(suffix)[0]+newTitle;
					if( $(this).hasClass('copyform') ){
						//复制页面需要放在localstorge里面的参数
						var layId = top.$("#admin-body iframe:visible").attr("data-index")+newTitle;
						localStorage.removeItem("dataParmJsonArr"+layId);
						localStorage.setItem("dataParmJsonArr"+layId, JSON.stringify( [{"mainId":$('[name$=".id"]').val()}] ));
					}
					openTab(newSrc,newTitle);
					
				}
			})
			
		    $(document).on('click','.submitform, .saveform, .submitformspe, .saveformspe',function(){
		    	
		    	if( $('[name$=".id"]').val()=='' ){
		    		
		    		if( top.$('#admin-body iframe:visible').attr('src').indexOf('/copy.html')!=-1 ){
		    			var pageType = 'copy';
		    		}else{
		    			var pageType = 'create';
		    		}
		    		
		    		if( $(this).hasClass('saveform') || $(this).hasClass('saveformspe') ){
		    			type="create"
		    		}else if( $(this).hasClass('submitform') || $(this).hasClass('submitformspe') ){
		    			type="submit"
		    		}
		    	}else{
		    		var pageType = 'update';
		    		if( $(this).hasClass('saveform') || $(this).hasClass('saveformspe') ){
		    			type="change"
		    		}else if( $(this).hasClass('submitform') || $(this).hasClass('submitformspe') ){
		    			type="submit"
		    		}
		    	}
		    	var saveformUrl = testDomainName +  urlParam.apiBase + urlParam.baseName +'/' + pageType+'/' + type + '/' + urlParam.endName;
		    	if( isStaticPage() ){
		    		saveformspe(saveformUrl);
		    	}else{
		    		saveform(saveformUrl);
		    	}
		    	
		    }) 
		     
		    $(document).on('click','.unsubmitform, .auditform, .unauditform',function(){
		    	if( $(this).hasClass('unsubmitform') ){
					type="unsubmit"
				}else if( $(this).hasClass('auditform') ){
					type="audit"
				}else if( $(this).hasClass('unauditform') ){
					type="unaudit"
				}
		    	var saveformUrl = testDomainName +  urlParam.apiBase + urlParam.baseName + '/' + type + '/' + type + '/' + urlParam.endName;
		    	saveformNoForm(saveformUrl);
		    })
			
		    $(document).on('click','.exitform',function(){
		    	closetab()
		    })
			
			$(document).on('click','.listform',function(){
				if( isTreeSearch() ){
					var page = 'treesearch.html'
				}else{
					var page = 'search.html'
				}
				var src = top.$("#admin-body iframe:visible").attr("src");
				var newSrc = src.substring(0, src.lastIndexOf("/") + 1)+page;
				var title = top.$('.layui-tab-title .layui-this cite').text();
				var suffix = title.indexOf(allLanguage.add)!=-1 ? allLanguage.add : title.indexOf(allLanguage.update)!=-1 ? allLanguage.update : allLanguage.copy;
				var newTitle = title.split(suffix)[0]+allLanguage.list;
				openTab(newSrc,newTitle);
		    })
	}
	
	 
	
})
