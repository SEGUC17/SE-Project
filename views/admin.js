<HTML>
<HEAD>
<TITLE>Karim</TITLE>
</HEAD>
<BODY BGCOLOR="FFFFFF">
<HR>
</div>
<div class="col-xs-12 col-md-8">
          <div class="row">
              <% for(var i=0; i<Entertainments.length; i++){%>

              </br>

                      <form method="post" action='/remove'>
                      <textarea><%=Entertainments[i].name%></textarea>
                      <input type="hidden" name="username"  value="<%= Entertainments[i].username %>"></input>
                      <button type="submit" class="btn btn-primary card-link">See Profile</button>
                      </form>
                    </br>
                  </div>
              <% } %>
          </div>
      </div>
<HR>
</BODY>
</HTML>
